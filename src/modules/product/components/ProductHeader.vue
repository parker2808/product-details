<template>
  <div class="flex flex-col gap-4 md:gap-6 lg:gap-8 text-text-dark">
    <span class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight">{{
      title
    }}</span>
    <span class="text-sm md:text-base font-normal leading-relaxed">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<style scoped lang="scss"></style>
