<script setup lang="ts">
import { createLayoutCssVars, LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID } from './shared'

defineOptions({
  name: 'BaseLayout',
})

const props = withDefaults(defineProps<UI.BaseLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollElId: LAYOUT_SCROLL_EL_ID,
  commonClass: 'transition-all-300',
  fixedTop: true,
  maxZIndex: LAYOUT_MAX_Z_INDEX,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 48,
  siderVisible: true,
  siderCollapse: false,
  siderWidth: 220,
  siderCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48,
  rightFooter: false,
})

const emit = defineEmits<{
  (e: 'update:siderCollapse', collapse: boolean): void
}>()

const slots = defineSlots<Slots>()

type SlotFn = (props?: Record<string, unknown>) => any

type Slots = {
  default?: SlotFn
  header?: SlotFn
  tab?: SlotFn
  sider?: SlotFn
  footer?: SlotFn
}

const cssVars = computed(() => createLayoutCssVars(props))

const showHeader = computed(() => Boolean(slots.header) && props.headerVisible)
const showTab = computed(() => Boolean(slots.tab) && props.tabVisible)
const showSider = computed(() => !props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showMobileSider = computed(() => props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showFooter = computed(() => Boolean(slots.footer) && props.footerVisible)

const isWrapperScroll = computed(() => props.scrollMode === 'wrapper')
const isContentScroll = computed(() => props.scrollMode === 'content')

const isVertical = computed(() => props.mode === 'vertical')
const isHorizontal = computed(() => props.mode === 'horizontal')

const fixedHeaderAndTab = computed(() => props.fixedTop || (isHorizontal.value && isWrapperScroll.value))

const leftGapClass = computed(() => {
  if (!props.fullContent && showSider.value){
    return props.siderCollapse ? 'pl-[--la-sider-collapsed-width]' : 'pl-[--la-sider-width]'
  }
  return ''
})

const headerLeftGapClass = computed(() => isVertical.value ? leftGapClass.value : '')

const footerLeftGapClass = computed(() => {
  if (isVertical.value
    || isHorizontal.value && isWrapperScroll.value && !props.fixedFooter
    || Boolean(isHorizontal.value && props.rightFooter)
  ){
    return leftGapClass.value
  }
  return ''
})

const siderPaddingClass = computed(() => {
  let cls = ''

  if (showHeader.value && !headerLeftGapClass.value){
    cls += 'pt-[--la-header-height]'
  }
  if (showFooter.value && !footerLeftGapClass.value){
    cls += ' pb-[--la-footer-height]'
  }
  return cls
})

function handleClickMask() {
  emit('update:siderCollapse', true)
}
</script>

<template>
  <div class="relative h-full" :class="[commonClass]" :style="cssVars">
    <div
      :id="isWrapperScroll ? scrollElId : undefined"
      class="h-full flex flex-col"
      :class="[commonClass, scrollWrapperClass, { 'overflow-y-hidden': isWrapperScroll }]"
    >
      <template v-if="showHeader">
        <header
          v-show="!fullContent"
          class="flex-shrink-0 z-[--la-header-z-index]"
          :class="[
            commonClass,
            headerClass,
            headerLeftGapClass,
            { 'absolute top-0 left-0 w-full': fixedHeaderAndTab },
          ]"
        >
          <slot name="header" />
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden h-[--la-header-height]"
        />
      </template>
      <!-- TODO: -->
    </div>
  </div>
</template>
