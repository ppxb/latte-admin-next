<script setup lang="ts">
import type {
  DropdownDividerOption,
  DropdownGroupOption,
  DropdownOption,
  DropdownRenderOption,
} from 'naive-ui'
import {
  NAvatar,
  NText,
} from 'naive-ui'
import { useUserStore } from '~/store'

defineOptions({
  name: 'UserDropdown',
})

type AppDropdownOption = DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption

const options = [
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader,
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
] as AppDropdownOption[]

function renderCustomHeader() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: 'https://img.wxcha.com/m00/06/c2/8ca26e4e4eff9c8bafaf504ed114da07.jpg',
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => 'ppxb' })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(
            NText,
            { depth: 3 },
            { default: () => '你从哪里来，我的朋友' },
          ),
        ]),
      ]),
    ],
  )
}

const router = useRouter()
const userStore = useUserStore()

function logout() {
  window.$dialog?.warning({
    title: '提示',
    content: '确认退出登录？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await userStore.logout()
      await router.replace('/login')
    },
  })
}

function handleSelect(key: string | number) {
  switch (key){
    case 'logout':
      return logout()
    default:
      window.$message?.info(String(key))
  }
}
</script>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <NAvatar class="w-8 h-8" round src="https://img.wxcha.com/m00/06/c2/8ca26e4e4eff9c8bafaf504ed114da07.jpg" />
  </n-dropdown>
</template>
