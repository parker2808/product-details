<template>
  <app-drawer
    :visible="isVisible"
    :title="modalConfig?.title || ''"
    :position="modalConfig?.position || 'right'"
    :size="modalConfig?.size"
    @close="onClose"
  >
    <!-- Header slot -->
    <template #header>
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ modalConfig?.title }}
        </h3>
      </slot>
    </template>

    <!-- Content slot -->
    <slot />

    <!-- Footer slot -->
    <template #footer>
      <slot name="footer" />
    </template>
  </app-drawer>
</template>

<script setup lang="ts">
import AppDrawer from '@/modules/core/components/drawer/AppDrawer.vue'
import { useModalStore } from '@/modules/core/stores/modal.store'

interface Props {
  /** Modal identifier */
  modalId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  opened: []
  closed: []
}>()

const modalStore = useModalStore()

/**
 * Get modal configuration from store
 */
const modalConfig = computed(() => modalStore.getModal(props.modalId))

/**
 * Check if modal is visible
 */
const isVisible = computed(() => modalStore.isModalVisible(props.modalId))

/**
 * Handle modal close
 */
const onClose = () => {
  modalStore.closeModal(props.modalId)
  emit('close')
  emit('closed')
}

/**
 * Watch for visibility changes
 */
watch(isVisible, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    emit('opened')
  } else if (!newValue && oldValue) {
    emit('closed')
  }
})
</script>
