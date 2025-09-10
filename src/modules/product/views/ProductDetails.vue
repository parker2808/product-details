<template>
  <div
    class="flex flex-col lg:flex-row size-full gap-6 md:gap-12 lg:gap-20 py-4 md:py-8 lg:py-16 px-4 md:px-8 lg:px-[7.5rem] items-start justify-center"
  >
    <image-sliders :images="images" />
    <div
      class="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:max-w-[31.875rem] break-words whitespace-break-spaces"
    >
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
