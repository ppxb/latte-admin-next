import type { FormInst } from 'naive-ui'

export function useForm() {
  const formRef = ref<FormInst | null>(null)

  const validate = async () => {
    await formRef.value?.validate()
  }

  const restoreValidation = async () => {
    formRef.value?.restoreValidation()
  }

  return {
    formRef,
    validate,
    restoreValidation,
  }
}
