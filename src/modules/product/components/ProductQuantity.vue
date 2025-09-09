<template>
  <div v-if="selectedProduct" class="flex flex-col gap-4">
    <span class="text-text-dark text-3xl font-semibold">{{ formatCurrency(totalPrice) }}</span>

    <div class="flex flex-col gap-2">
      <span class="text-text-dark text-sm font-normal">{{ 'Quantity' }}</span>

      <div class="flex w-full gap-4 items-center">
        <div
          class="flex items-center gap-1 border border-border-gray px-1 py-1.5 justify-center hover:cursor-pointer"
        >
          <div
            :class="selectedProduct?.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'p-1'"
            @click="calculateQuantity('minus')"
          >
            <inline-svg :src="minus" class="size-4" />
          </div>
          <span class="text-text-dark text-sm font-normal w-6 text-center">{{
            selectedProduct?.quantity
          }}</span>
          <div class="p-1" @click="calculateQuantity('plus')">
            <inline-svg :src="plus" class="size-4" />
          </div>
        </div>

        <div
          class="flex items-center gap-1 w-full bg-text-dark hover:cursor-pointer px-1 py-2 justify-center hover:bg-primary-500 transition-colors duration-200"
        >
          <inline-svg :src="BasketAdd" class="size-4" />
          <span class="text-white text-sm font-semibold capitalize">Add to Cart</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDetailForm } from '@/modules/product/types/forms/product-detail-form.type'
import { getProductPrice } from '@/modules/product/utils/product-price.util'
import { formatCurrency } from '@/modules/core/utils/currency-format.util'
import minus from '~/src/assets/icons/minus.svg'
import plus from '~/src/assets/icons/plus.svg'
import BasketAdd from '~/src/assets/icons/basket-add.svg'

const selectedProduct = defineModel<ProductDetailForm | undefined>({ required: true })
const totalPrice = computed(() => {
  return getProductPrice(selectedProduct.value as ProductDetailForm)
})

const calculateQuantity = (type: 'minus' | 'plus') => {
  if (!selectedProduct.value || (type === 'minus' && selectedProduct.value.quantity === 1)) return

  const increment = type === 'minus' ? -1 : 1
  selectedProduct.value.quantity += increment
}
</script>

<style scoped lang="scss"></style>
