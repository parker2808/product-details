import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { ModalConfig, ModalPosition } from '@/modules/core/types/entities/modal.type'

interface ModalData {
  title?: string
  options?: any[]
  selectedOption?: any
  modalType?: string
  contextData?: any
  onAction?: (action: string, payload: any) => void
  [key: string]: any
}

interface ModalState {
  modals: Record<string, ModalConfig>
  modalData: Record<string, ModalData>
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    modals: {},
    modalData: {}
  }),

  getters: {
    /**
     * Get all visible modals
     */
    visibleModals: state => Object.values(state.modals).filter(modal => modal.visible),

    /**
     * Get modal by id
     */
    getModal: state => (id: string) => state.modals[id],

    /**
     * Check if modal is visible
     */
    isModalVisible: state => (id: string) => state.modals[id]?.visible || false,

    /**
     * Get modal data by id
     */
    getModalData: state => (id: string) => state.modalData[id]
  },

  actions: {
    /**
     * Generate a new UUID for modal
     */
    generateModalId(): string {
      return uuidv4()
    },

    /**
     * Open a modal with configuration and optional data
     */
    openModal(
      config: {
        id?: string
        title: string
        position?: ModalPosition
        size?: string
      },
      data?: ModalData
    ): string {
      const modalId = config.id || this.generateModalId()

      this.modals[modalId] = {
        id: modalId,
        title: config.title,
        position: config.position || 'right',
        size: config.size || 'w-full md:w-[32rem] lg:w-[32rem]',
        visible: true
      }

      if (data) {
        this.modalData[modalId] = data
      }

      return modalId
    },

    /**
     * Open a modal with auto-generated UUID
     */
    openModalWithUUID(
      config: {
        title: string
        position?: ModalPosition
        size?: string
      },
      data?: ModalData
    ): string {
      return this.openModal(config, data)
    },

    /**
     * Set modal data
     */
    setModalData(id: string, data: ModalData) {
      this.modalData[id] = { ...this.modalData[id], ...data }
    },

    /**
     * Close specific modal by id
     */
    closeModal(id: string) {
      if (this.modals[id]) {
        this.modals[id].visible = false
      }
    },

    /**
     * Close all modals
     */
    closeAllModals() {
      Object.keys(this.modals).forEach(id => {
        this.modals[id].visible = false
      })
    },

    /**
     * Remove modal from store
     */
    removeModal(id: string) {
      delete this.modals[id]
      delete this.modalData[id]
    }
  }
})
