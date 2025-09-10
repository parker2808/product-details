<template>
  <client-only>{{ 'Home' }}</client-only>
</template>

<script setup lang="ts">
import { PUBLIC_ROUTE } from '@/modules/core/enums/public-routes.enum'
import { PRODUCT_ROUTE } from '@/modules/product/enums/product-routes.enum'

definePageMeta({
  name: PUBLIC_ROUTE.HOME,
  layout: 'public'
})

await navigateTo({
  name: PRODUCT_ROUTE.DETAIL
})
</script>
