<template>
  <div class="flex size-full gap-20 p-[7.5rem] items-start justify-center">
    <image-sliders :images="images" />
    <div class="flex flex-col gap-10 max-w-[31.875rem] break-words whitespace-break-spaces">
      <product-header
        :title="productDetails.product.name"
        :description="productDetails.product.description"
      />
      <product-options v-model="selectedProduct" :product-details="productDetails" />
      <product-quantity v-model="selectedProduct" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Image1 from '@/assets/images/image-1.png'
import Image2 from '@/assets/images/image-2.png'
import Image3 from '@/assets/images/image-3.png'
import Image4 from '@/assets/images/image-4.png'
import ImageSliders from '@/modules/core/components/sliders/ImageSliders.vue'
import ProductHeader from '@/modules/product/components/ProductHeader.vue'
import ProductOptions from '@/modules/product/components/ProductOptions.vue'
import { productDetailsMockup as productDetails } from '@/modules/product/mockups/products.mockup'
import type { ProductDetailForm } from '@/modules/product/types/forms/product-detail-form.type'
import ProductQuantity from '@/modules/product/components/ProductQuantity.vue'

const images = [Image1, Image2, Image3, Image4]

const selectedProduct = ref<ProductDetailForm>()
</script>

<style scoped lang="scss"></style>
