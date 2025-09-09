<template>
  <app-modal :modal-id="modalId" @close="onClose">
    <!-- Header -->
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900">
        {{ title }}
      </h3>
    </template>

    <!-- Content -->
    <div class="space-y-3">
      <div
        v-for="(option, index) in options"
        :key="option.uid"
        class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200 animate__animated animate__fadeInUp animate__faster"
        :style="{ 'animation-delay': `${index * 50}ms` }"
        @click="selectAndEmit(option)"
      >
        <!-- Option name and details -->
        <div class="flex-1">
          <div class="font-medium text-text-dark">
            {{ option.displayName }}
          </div>
          <div class="text-sm text-gray-500">SKU: {{ option.skuCode }}</div>
          <div class="text-sm font-medium text-text-dark">
            {{ formatPrice(option.price) }}
          </div>
        </div>

        <!-- Checkbox -->
        <div class="flex-shrink-0 ml-3">
          <div
            :class="[
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
              selectedOption?.uid === option.uid
                ? 'bg-text-dark border-text-dark'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <svg
              v-if="selectedOption?.uid === option.uid"
              class="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!options || options.length === 0" class="text-center py-8 text-gray-500">
        No options available
      </div>
    </div>
  </app-modal>
</template>

<script setup lang="ts">
import AppModal from '@/modules/core/components/modal/AppModal.vue'
import type { Option } from '@/modules/product/types/entities/option.type'
import type { ModalItem } from '@/modules/core/types/entities/modal.type'
import { formatCurrency } from '@/modules/core/utils/currency-format.util'

interface Props {
  /** Modal identifier */
  modalId: string
  /** Modal title */
  title: string
  /** Options to display */
  options: Option[]
  /** Currently selected option */
  selectedOption?: Option
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  select: [option: Option]
}>()

/**
 * Select an option and emit directly
 */
const selectAndEmit = (option: Option) => {
  emit('select', option)
  emit('close')
}

/**
 * Handle modal close
 */
const onClose = () => {
  emit('close')
}

/**
 * Format price using the currency formatter
 */
const formatPrice = (price: number): string => {
  return formatCurrency(price)
}

/**
 * Current selected option
 */
const selectedOption = computed(() => props.selectedOption)
</script>
