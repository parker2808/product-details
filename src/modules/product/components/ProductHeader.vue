<template>
  <div
    class="flex flex-col gap-8 text-text-dark"
  >
    <span class="text-5xl font-normal">{{ title }}</span>
    <span class="text-base font-normal">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<style scoped lang="scss"></style>
