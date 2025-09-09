<template>
  <nuxt-img v-if="isIPXPath(src)" :src="src" :alt="alt" v-bind="$attrs" />
  <img v-else :src="src" :alt="alt" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { isIPXPath } from '@/modules/core/utils/image.utils'

withDefaults(defineProps<{
  src: string
  alt?: string
}>(), {
  alt: ''
})
</script>
