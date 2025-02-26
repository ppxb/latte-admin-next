<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { ArrowEnterLeft24Filled, ArrowSort28Filled } from '@vicons/fluent'
import { SearchOutline } from '@vicons/ionicons5'
import { useEventListener } from '@vueuse/core'

import { useRouteStore } from '~/store'

interface SearchResult {
  title: string
  path: string
}

defineOptions({
  name: 'Search',
})

const router = useRouter()
const routeStore = useRouteStore()

const showSearchModal = ref(false)
const searchKeyword = ref('')
const searchResults = ref<SearchResult[]>([])
const selectedIndex = ref(-1)
const searchInput = ref<HTMLInputElement | null>(null)
const resultRefs = ref<HTMLElement[]>([])

function searchRoutes(keyword: string) {
  if (!keyword.trim()){
    return []
  }

  const result: SearchResult[] = []
  const loop = (routes: RouteRecordRaw[]) => {
    routes.forEach((route) => {
      if (route.children && route.children.length > 0) {
        loop(route.children)
      }
      else {
        if (route.meta?.title?.toLowerCase().includes(keyword.toLowerCase())) {
          result.push({
            title: route.meta.title,
            path: route.path,
          })
        }
      }
    })
  }
  loop(routeStore.routes)
  return result
}

function handleSearch(keyword: string) {
  if (!keyword.trim()) {
    searchResults.value = []
    return
  }
  searchResults.value = searchRoutes(keyword)
  selectedIndex.value = searchResults.value.length > 0 ? 0 : -1
  resultRefs.value = []

  nextTick(() => {
    scrollToSelectedResult()
  })
}

function handleResultClick(item: SearchResult) {
  if (!item){
    return
  }
  router.push(item.path)
  showSearchModal.value = false
}

function openSearchModal() {
  showSearchModal.value = true
}

function scrollToSelectedResult() {
  nextTick(() => {
    if (searchResults.value.length > 0 && selectedIndex.value >= 0) {
      const selectedEl = resultRefs.value[selectedIndex.value]
      const containerEl = document.querySelector('.scrollbar-container')
      if (selectedEl && containerEl) {
        ensureElementInView(selectedEl, containerEl)
      }
    }
  })
}

function ensureElementInView(el: HTMLElement, container: HTMLElement) {
  const containerRect = container.getBoundingClientRect()
  const elementRect = el.getBoundingClientRect()

  const elementTop = elementRect.top - containerRect.top + container.scrollTop
  const elementBottom = elementTop + elementRect.height

  if (elementTop < container.scrollTop) {
    container.scrollTo({
      top: elementTop,
      behavior: 'smooth',
    })
  }
  else if (elementBottom > container.scrollTop + containerRect.height) {
    container.scrollTo({
      top: elementBottom - containerRect.height,
      behavior: 'smooth',
    })
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (searchResults.value.length > 0) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (selectedIndex.value < searchResults.value.length - 1) {
        selectedIndex.value++
      }
      scrollToSelectedResult()
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      }
      scrollToSelectedResult()
    }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < searchResults.value.length) {
        handleResultClick(searchResults.value[selectedIndex.value])
      }
      else if (searchResults.value.length > 0) {
        handleResultClick(searchResults.value[0])
      }
    }
  }
}

watch(showSearchModal, (newValue) => {
  if (!newValue) {
    searchResults.value = []
    searchKeyword.value = ''
    selectedIndex.value = -1
  }
})

watch(searchKeyword, (newValue) => {
  handleSearch(newValue)
})

useEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openSearchModal()
  }
})
</script>

<template>
  <button
    class="group bg-[--bg-body-color] text-[--text-color] leading-none flex items-center h-8 rounded-[50px] border-none gap-[10px] cursor-pointer px-2 lg:p-[4px_6px_4px_10px] outline-none"
    @click="openSearchModal"
  >
    <n-icon :size="16" class="op50 transition-opacity group-hover:op100">
      <SearchOutline />
    </n-icon>
    <span class="hidden op50 pr-2px text-sm transition-opacity group-hover:op100 lg:block">搜索</span>
    <code class="hidden lg:flex items-center font-mono text-[10px] gap-1 bg-[--bg-sidebar-color] rounded-[4px_10px_10px_4px] pl-1.5 pr-2 py-1 font-semibold">
      CTRL K
    </code>
  </button>
  <n-modal v-model:show="showSearchModal" transform-origin="center">
    <n-card
      style="width: 600px;border-radius: 8px;"
      content-class="p-0!"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <div class="rounded-2">
        <div class="flex items-center h-50px gap-5 p-5">
          <n-icon :size="16">
            <SearchOutline />
          </n-icon>
          <input
            ref="searchInput"
            v-model="searchKeyword"
            class="text-[16px] bg-transparent grow outline-none border-none min-w-[100px]"
            placeholder="搜索"
            @keydown="handleKeyDown"
          >
          <code class="flex items-center font-mono text-[10px] bg-[--bg-body-color] rounded-6px px-1.5 py-0.5 font-semibold">
            ESC
          </code>
        </div>
        <n-divider />
        <n-scrollbar class="max-h-96">
          <div class="scrollbar-container p-4">
            <div v-if="searchResults.length">
              <div class="text-sm mb-2">
                搜索到 {{ searchResults.length }} 个结果
              </div>
              <div class="space-y-1">
                <div
                  v-for="(item, index) in searchResults"
                  :key="item.path"
                  :ref="el => { if (el) resultRefs[index] = el as HTMLElement }"
                  class="flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200"
                  :class="{ 'bg-[#00b37a1a]': index === selectedIndex }"
                  @click="handleResultClick(item)"
                  @mouseover="selectedIndex = index"
                >
                  <div class="i-carbon:document mr-2 text-xl" />
                  <div class="flex items-center text-16px">
                    {{ item.title }}
                  </div>
                  <div class="ml-auto flex items-center text-[12px] bg-[--bg-body-color] rounded-6px px-1.5 py-0.5">
                    目录
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="searchResults.length === 0 && searchKeyword === ''" class="text-lg text-center p-[30px_0_40px]">
              请输入关键词进行搜索
            </div>
            <div v-else class="text-lg text-center p-[30px_0_40px]">
              没有找到任何跟 <span class="font-bold">"{{ searchKeyword }}"</span> 有关的信息
            </div>
          </div>
        </n-scrollbar>
        <n-divider />
        <div class="flex items-center justify-center text-12px gap-5 py-10px">
          <div class="flex items-center justify-center gap-2">
            <div class="flex items-center justify-center bg-white/30 w-18px h-18px pt-1px text-center rounded-1">
              <n-icon :size="12">
                <ArrowEnterLeft24Filled />
              </n-icon>
            </div>
            <span class="op70">选择</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <div class="flex items-center justify-center bg-white/30 w-18px h-18px pt-1px text-center rounded-1">
              <n-icon :size="12">
                <ArrowSort28Filled />
              </n-icon>
            </div>
            <span class="op70">切换</span>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped>
.n-modal, .n-card.n-modal[role] {
  background-color: rgba(var(--bg-default-color) / .7);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  max-width: 90%;
  margin: 10vh auto;
}

.n-divider:not(.n-divider--vertical){
  margin: 0;
}
</style>
