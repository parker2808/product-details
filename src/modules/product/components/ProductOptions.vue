<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 text-text-dark items-center">
      <span class="text-xl font-normal capitalize whitespace-nowrap">{{ 'Choose Options' }}</span>
      <div class="border-b border-text-dark w-full" />
    </div>

    <div class="grid grid-cols-1 border border-border-gray">
      <div
        v-for="option in Object.keys(productOptions)"
        :class="[
          'grid grid-cols-3 gap-2 px-4 py-2 border-border-gray cursor-pointer hover:bg-gray-50 transition-colors',
          {
            'border-b':
              option !== Object.keys(productOptions)[Object.keys(productOptions).length - 1]
          }
        ]"
        @click="openOptionModal(option as PRODUCT_OPTION)"
      >
        <span class="text-text-dark text-base font-semibold col-span-1">{{ option }}</span>
        <span class="text-text-dark text-base font-normal col-span-2">{{
          (selectedProduct?.[productOptionKeyMapping[option as PRODUCT_OPTION]] as Option)
            ?.displayName || 'N/A'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCT_OPTION } from '@/modules/product/enums/product-option.enum'
import type { ProductDetailForm } from '@/modules/product/types/forms/product-detail-form.type'
import { getOptionsByName } from '@/modules/product/utils/product-option.util'
import type { Option } from '@/modules/product/types/entities/option.type'
import type { ProductDetail } from '@/modules/product/types/entities/product-detail.type'
import { productOptionKeyMapping } from '@/modules/product/constants/product-option-form.constant'
import { useModal } from '@/modules/core/composables/use-modal'
import ProductModal from '@/modules/product/components/ProductModal.vue'

const props = defineProps<{
  productDetails: ProductDetail
}>()

const productOptions = computed<Record<PRODUCT_OPTION, Option[]>>(() => {
  return {
    [PRODUCT_OPTION.SIZE]: getOptionsByName(props.productDetails, PRODUCT_OPTION.SIZE),
    [PRODUCT_OPTION.COLOUR]: getOptionsByName(props.productDetails, PRODUCT_OPTION.COLOUR),
    [PRODUCT_OPTION.DRAWER_FRONT]: getOptionsByName(
      props.productDetails,
      PRODUCT_OPTION.DRAWER_FRONT
    ),
    [PRODUCT_OPTION.SLABTOP]: getOptionsByName(props.productDetails, PRODUCT_OPTION.SLABTOP),
    [PRODUCT_OPTION.HANDLES]: getOptionsByName(props.productDetails, PRODUCT_OPTION.HANDLES)
  }
})

const selectedProduct = defineModel<ProductDetailForm | undefined>({ required: true })

const { openModal, closeModal } = useModal()

// Track modal IDs for each option type
const modalIds = ref<Record<PRODUCT_OPTION, string>>({
  [PRODUCT_OPTION.SIZE]: '',
  [PRODUCT_OPTION.COLOUR]: '',
  [PRODUCT_OPTION.DRAWER_FRONT]: '',
  [PRODUCT_OPTION.SLABTOP]: '',
  [PRODUCT_OPTION.HANDLES]: ''
})

// Initialize the model with default values if not provided
watchEffect(() => {
  if (!selectedProduct.value) {
    selectedProduct.value = {
      productId: props.productDetails.product.uid,
      size: productOptions.value?.[PRODUCT_OPTION.SIZE]?.[0] || {},
      colour: productOptions.value?.[PRODUCT_OPTION.COLOUR]?.[0] || {},
      drawerFront: productOptions.value?.[PRODUCT_OPTION.DRAWER_FRONT]?.[0] || {},
      slabtop: productOptions.value?.[PRODUCT_OPTION.SLABTOP]?.[0] || {},
      handles: productOptions.value?.[PRODUCT_OPTION.HANDLES]?.[0] || {},
      quantity: 1
    }
  }
})

/**
 * Open modal for specific product option
 */
const openOptionModal = (optionType: PRODUCT_OPTION) => {
  const modalId = openModal(ProductModal, {
    title: `Select ${optionType}`,
    position: 'right',
    size: 'w-full md:w-[32rem] lg:w-[32rem]',
    props: {
      options: productOptions.value[optionType],
      selectedOption: selectedProduct.value?.[productOptionKeyMapping[optionType]]
    },
    onAction: (action: string, payload: any) => {
      if (action === 'select') {
        onOptionSelect(optionType, payload)
      }
    },
    onClose: () => {
      // Clear the modal ID after closing
      modalIds.value[optionType] = ''
    }
  })

  // Store the modal ID for this option type
  modalIds.value[optionType] = modalId
}

/**
 * Handle option selection from modal
 */
const onOptionSelect = (optionType: PRODUCT_OPTION, selectedOption: Option) => {
  if (!selectedProduct.value) return

  // Update the selected product with the new option
  const optionKey = productOptionKeyMapping[optionType]
  selectedProduct.value = {
    ...selectedProduct.value,
    [optionKey]: selectedOption
  }

  // Close the modal using the stored UUID
  const modalId = modalIds.value[optionType]
  if (modalId) {
    closeModal(modalId)
    // Clear the modal ID after closing
    modalIds.value[optionType] = ''
  }
}
</script>

<style scoped lang="scss"></style>
