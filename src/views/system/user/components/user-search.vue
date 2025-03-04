<script setup lang="ts">
import { useForm } from '~/hooks/use-form'

defineOptions({
  name: 'UserSearch',
})

const emit = defineEmits<Emits>()

interface Emits{
  (e: 'reset'): void
  (e: 'search'): void
}

const { formRef, validate, restoreValidation } = useForm()

const model = defineModel<Api.UserSearchParams>('model', { required: true })

const selectOptions = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 2,
  },
]

async function reset() {
  await restoreValidation()
  emit('reset')
}

async function search(){
  await validate()
  emit('search')
}
</script>

<template>
  <NCard :bordered="false" size="small" class="rounded-2">
    <NCollapse>
      <NCollapseItem title="搜索" name="user-search">
        <n-form ref="formRef" :model="model">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" path="description" class="pr-6">
              <NInput v-model:value="model.description" placeholder="搜索用户名/昵称/描述" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              path="status"
              class="pr-6"
            >
              <NSelect
                v-model:value="model.status"
                placeholder="请选择状态"
                :options="selectOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:12" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <NIcon :size="16">
                      <SvgIcon icon="carbon:restart" />
                    </NIcon>
                  </template>
                  重置
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <NIcon :size="16">
                      <SvgIcon icon="carbon:search" />
                    </NIcon>
                  </template>
                  搜索
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </n-form>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>
