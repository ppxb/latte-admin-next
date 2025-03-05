<script setup lang="ts">
defineOptions({
  name: 'TagGroup',
})

defineProps<{
  tags: string[]
}>()
</script>

<template>
  <NSpace v-if="tags.length === 1" justify="center">
    <NTag>{{ tags[0] }}</NTag>
  </NSpace>
  <NSpace v-else justify="center">
    <NTag>{{ tags[0] }}</NTag>
    <NPopover trigger="hover">
      <template #trigger>
        <NTag>+{{ tags.length - 1 }}</NTag>
      </template>
      <NSpace>
        <NTag v-for="(tag, index) in tags.slice(1)" :key="index">
          {{ tag }}
        </NTag>
      </NSpace>
    </NPopover>
  </NSpace>
</template>
