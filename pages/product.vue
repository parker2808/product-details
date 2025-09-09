<script setup lang="ts">
import { PRODUCT_ROUTE } from '@/modules/product/enums/product-routes.enum'

definePageMeta({
  name: PRODUCT_ROUTE.DETAIL,
  layout: 'public'
})
</script>

<template>
  <client-only>{{ 'Product' }}</client-only>
</template>
