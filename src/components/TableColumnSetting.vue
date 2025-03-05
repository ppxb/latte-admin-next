<script setup lang="ts" generic="T extends Record<string, unknown>, K=never">
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({
  name: 'TableColumnSetting',
})

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  required: true,
})
</script>

<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NButton size="small">
        <template #icon>
          <NIcon :size="16">
            <SvgIcon icon="carbon:settings-adjust" />
          </NIcon>
        </template>
        列设置
      </NButton>
    </template>
    <VueDraggable v-model="columns" :animation="150" filter=".none_draggable">
      <div v-for="item in columns" :key="item.key" class="h-9 flex items-center rounded hover:(bg-primary bg-opacity-20)">
        <NIcon :size="16" class="mr-4 cursor-move">
          <SvgIcon icon="carbon:settings-adjust"/>
        </NIcon>
        <NCheckbox v-model:checked="item.checked" class="none_draggable flex-1">
          {{ item.title }}
        </NCheckbox>
      </div>
    </VueDraggable>
  </NPopover>
</template>
