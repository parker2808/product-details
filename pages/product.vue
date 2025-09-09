<script setup lang="ts">
import { PRODUCT_ROUTE } from '@/modules/product/enums/product-routes.enum'
import ProductDetails from '@/modules/product/views/ProductDetails.vue'

definePageMeta({
  name: PRODUCT_ROUTE.DETAIL,
  layout: 'public'
})
</script>

<template>
  <client-only>
    <product-details />
  </client-only>
</template>
