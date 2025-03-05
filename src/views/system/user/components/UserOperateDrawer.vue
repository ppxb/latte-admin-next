<script setup lang="ts">
import { userGenderOptions } from '~/constants'
import { useForm } from '~/hooks/use-form'

defineOptions({
  name: 'UserOperateDrawer',
})

const props = defineProps<{
  operateType: NaiveUI.TableOperateType
  rowData?: Api.User | null
}>()

const emit = defineEmits<{
  (e: 'submitted'): void
}>()

const visible = defineModel<boolean>('visible', {
  default: false,
})

const { formRef, validate, restoreValidation } = useForm()

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增用户',
    edit: '编辑用户',
  }
  return titles[props.operateType]
})

type Model = Pick<
  Api.User,
  'username' | 'nickname' | 'phone' | 'email' | 'gender' | 'description' | 'status' | 'deptId' | 'roleIds'
>

const model = ref(createDefaultModel())

function createDefaultModel(): Model {
  return {
    username: '',
    nickname: '',
    phone: '',
    email: '',
    gender: 0,
    status: 1,
    description: '',
    deptId: '',
    roleIds: [],
  }
}

function handleInitModel() {
  model.value = createDefaultModel()
  if (props.operateType === 'edit' && props.rowData){
    Object.assign(model.value, props.rowData)
  }
}

function closeDrawer() {
  visible.value = false
}

async function handleSubmit() {
  await validate()
  window.$message?.success('更新成功')
  closeDrawer()
  emit('submitted')
}

watchEffect(() => {
  if (visible.value) {
    handleInitModel()
    restoreValidation()
  }
})
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="500">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem label="用户名" path="username">
          <NInput v-model:value="model.username" placeholder="请输入用户名" />
        </NFormItem>
        <NFormItem label="昵称" path="nickname">
          <NInput v-model:value="model.nickname" placeholder="请输入昵称" />
        </NFormItem>
        <NFormItem label="手机号码" path="phone">
          <NInput v-model:value="model.phone" placeholder="请输入手机号码" />
        </NFormItem>
        <NFormItem label="邮箱" path="email">
          <NInput v-model:value="model.email" placeholder="请输入邮箱地址" />
        </NFormItem>
        <NFormItem label="性别" path="gender">
          <NRadioGroup v-model:value="model.gender">
            <NRadioButton v-for="item in userGenderOptions" :key="item.value" :value="Number(item.value)" :label="item.label" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="描述" path="description">
          <NInput v-model:value="model.description" type="textarea" placeholder="请输入描述信息" />
        </NFormItem>
        <NFormItem label="状态" path="status">
          <NSwitch v-model:value="model.status" size="large" :round="false" :checked-value="1" :unchecked-value="2">
            <template #checked>
              启用
            </template>
            <template #unchecked>
              禁用
            </template>
          </NSwitch>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">
            取消
          </NButton>
          <NButton type="primary" @click="handleSubmit">
            确认
          </NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
