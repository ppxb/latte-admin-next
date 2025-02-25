<script setup lang="ts">
import { NAvatar, NText } from 'naive-ui'

import { useUserStore } from '~/store'

defineOptions({
  name: 'UserDropdown',
})

const router = useRouter()
const userStore = useUserStore()

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
] as App.AppDropdownOption[]

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
        src: userStore.avatar,
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => userStore.nickname })]),
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
    <NAvatar class="w-8 h-8 cursor-pointer" round :src="userStore.avatar" />
  </n-dropdown>
</template>
