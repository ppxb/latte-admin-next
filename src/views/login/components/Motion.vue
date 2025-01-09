<script setup lang="ts">
defineOptions({
  name: 'Motion',
})
</script>

<template>
  <div
    v-motion="{
      initial: {
        opacity: 0,
        x: 50,
      },
      enter: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 300,
          ease: 'easeOut',
        },
      },
    }"
  >
    <slot />
  </div>
</template>
