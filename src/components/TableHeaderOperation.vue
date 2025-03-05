<script setup lang="ts">
defineOptions({
  name: 'TableHeaderOperation',
})

defineProps<{
  itemAlign?: NaiveUI.Align
  disabledDelete?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (event: 'add'): void
  (event: 'delete'): void
  (event: 'refresh'): void
}>()

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  default: () => [],
})

function add() {
  emit('add')
}

function batchDelete() {
  emit('delete')
}

function refresh() {
  emit('refresh')
}
</script>

<template>
  <NSpace :align="itemAlign" wrap justify="end" class="lt-sm:w-200px">
    <slot name="prefix" />
    <slot name="default">
      <NButton type="primary" size="small" ghost @click="add">
        <template #icon>
          <NIcon :size="16">
            <SvgIcon icon="carbon:add-large" />
          </NIcon>
        </template>
        新增
      </NButton>
      <NPopconfirm @positive-click="batchDelete">
        <template #trigger>
          <NButton type="error" size="small" ghost :disabled="disabledDelete">
            <template #icon>
              <NIcon :size="16">
                <SvgIcon icon="carbon:trash-can" />
              </NIcon>
            </template>
            批量删除
          </NButton>
        </template>
        确认要删除吗
      </NPopconfirm>
    </slot>
    <NButton size="small" @click="refresh">
      <template #icon>
        <NIcon :size="16">
          <SvgIcon icon="carbon:restart" :class="{ 'animate-spin': loading }" />
        </NIcon>
      </template>
      刷新
    </NButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix" />
  </NSpace>
</template>
