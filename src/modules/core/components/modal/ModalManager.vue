<template>
  <!-- Render all visible modals -->
  <template v-for="modal in visibleModals" :key="modal.id">
    <app-modal :modal-id="modal.id">
      <!-- Render VNode directly if available -->
      <template v-if="isVNode(modal.id)">
        <component :is="getModalContentForId(modal.id)" />
      </template>

      <!-- Render dynamic component with props -->
      <template v-else>
        <component
          :is="getModalContentForId(modal.id)"
          v-bind="getModalProps(modal.id)"
          @select="onModalAction(modal.id, 'select', $event)"
          @close="onModalAction(modal.id, 'close', $event)"
        />
      </template>
    </app-modal>
  </template>
</template>

<script setup lang="ts">
import AppModal from '@/modules/core/components/modal/AppModal.vue'
import { useModalStore } from '@/modules/core/stores/modal.store'

const modalStore = useModalStore()

/**
 * Get all visible modals
 */
const visibleModals = computed(() => modalStore.visibleModals)

/**
 * Get the appropriate modal component/vnode for rendering
 */
const getModalContentForId = (modalId: string) => {
  const modalData = modalStore.getModalData(modalId)

  if (!modalData) {
    console.warn(`No modal data found for modal ID: ${modalId}`)
    return 'div'
  }

  // If VNode is provided (from h() function), use it directly
  if (modalData.vnode) {
    return modalData.vnode
  }

  // If component is provided, use it
  if (modalData.component) {
    return modalData.component
  }

  console.warn(`No component or vnode found for modal ID: ${modalId}`)
  return 'div' // Fallback component
}

/**
 * Check if modal content is a VNode
 */
const isVNode = (modalId: string): boolean => {
  const modalData = modalStore.getModalData(modalId)
  return !!modalData?.vnode
}

/**
 * Get modal-specific props based on modal data
 */
const getModalProps = (modalId: string) => {
  const modalData = modalStore.getModalData(modalId)
  const modalConfig = modalStore.getModal(modalId)

  // For VNodes, no additional props are needed since they're pre-configured
  if (isVNode(modalId)) {
    return {}
  }

  const standardProps = {
    modalId,
    title: modalConfig?.title || 'Modal'
  }

  const customProps = modalData?.props || {}

  return {
    ...standardProps,
    ...customProps
  }
}

/**
 * Handle modal actions (select, close, etc.)
 */
const onModalAction = (modalId: string, action: string, payload: any) => {
  const modalData = modalStore.getModalData(modalId)

  if (modalData?.onAction) {
    modalData.onAction(action, payload)
  }
}
</script>
