import { type Component, type VNode, h } from 'vue'
import { useModalStore } from '@/modules/core/stores/modal.store'
import type { ModalPosition } from '@/modules/core/types/entities/modal.type'

type OpenModalOptions = {
  title: string
  position?: ModalPosition
  size?: string
  props?: Record<string, any>
  onAction?: (action: string, payload: any) => void
  onClose?: () => void
}

/**
 * Dynamic modal management composable
 */
export const useModal = () => {
  const modalStore = useModalStore()

  /**
   * Open a modal with a direct component reference (most flexible)
   */
  const openModal = (
    component: Component | (() => Promise<Component>),
    options: OpenModalOptions
  ): string => {
    const modalId = modalStore.openModalWithUUID(
      {
        title: options.title,
        position: options.position || 'right',
        size: options.size || 'w-full md:w-[32rem] lg:w-[32rem]'
      },
      {
        component,
        props: options.props || {},
        onAction: (action: string, payload: any) => {
          // Handle close action automatically
          if (action === 'close') {
            modalStore.closeModal(modalId)
            options.onClose?.()
          }

          // Call custom action handler
          options.onAction?.(action, payload)
        }
      }
    )

    return modalId
  }

  /**
   * Open a modal by creating a VNode with h() (for advanced use cases)
   */
  const openModalWithVNode = (
    createVNode: () => VNode,
    options: Omit<OpenModalOptions, 'props'>
  ): string => {
    const modalId = modalStore.openModalWithUUID(
      {
        title: options.title,
        position: options.position || 'right',
        size: options.size || 'w-full md:w-[32rem] lg:w-[32rem]'
      },
      {
        vnode: createVNode(),
        onAction: (action: string, payload: any) => {
          // Handle close action automatically
          if (action === 'close') {
            modalStore.closeModal(modalId)
            options.onClose?.()
          }

          // Call custom action handler
          options.onAction?.(action, payload)
        }
      }
    )

    return modalId
  }

  /**
   * Utility to create VNode with h() for complex scenarios
   */
  const createModalVNode = (
    component: Component,
    props: Record<string, any> = {},
    children?: any
  ): VNode => {
    return h(component, props, children)
  }

  /**
   * Close a modal by ID
   */
  const closeModal = (modalId: string) => {
    modalStore.closeModal(modalId)
  }

  /**
   * Close all modals
   */
  const closeAllModals = () => {
    modalStore.closeAllModals()
  }

  return {
    openModal,
    openModalWithVNode,
    createModalVNode,
    closeModal,
    closeAllModals,
    h // Export h for convenience
  }
}
