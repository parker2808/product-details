/**
 * Generic modal item type
 */
export type ModalItem<T = any> = {
  /** Unique identifier for the modal */
  id: string
  /** Display name for the modal */
  name: string
  /** Original data of any type */
  original: T
}

/**
 * Modal position options
 */
export type ModalPosition = 'top' | 'right' | 'bottom' | 'left'

/**
 * Modal configuration
 */
export type ModalConfig = {
  /** Modal identifier */
  id: string
  /** Modal title */
  title: string
  /** Modal position */
  position: ModalPosition
  /** Modal size classes */
  size?: string
  /** Whether modal is visible */
  visible: boolean
}
