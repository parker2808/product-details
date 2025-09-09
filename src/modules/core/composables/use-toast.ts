import { ref, computed, nextTick } from 'vue'
import type {
  Toast,
  ToastOptions,
  ToastConfig,
  ToastType
} from '@/modules/core/types/entities/toast.type'

const toasts = ref<Toast[]>([])
const config = ref<ToastConfig>({
  position: 'top-right',
  defaultDuration: 5000,
  maxToasts: 5
})

/**
 * Composable for managing toast notifications
 * @returns Toast management functions and reactive state
 */
export const useToast = () => {
  const activeToasts = computed(() => toasts.value)

  /**
   * Generate a unique ID for the toast
   */
  const generateToastId = (): string => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Add a new toast notification
   * @param message - Toast message
   * @param options - Toast configuration options
   */
  const addToast = (message: string, options: ToastOptions = {}): string => {
    const toast: Toast = {
      id: generateToastId(),
      message,
      title: options.title,
      type: options.type || 'info',
      icon: options.icon,
      duration: options.duration ?? config.value.defaultDuration,
      persistent: options.persistent || false,
      createdAt: Date.now()
    }

    // Add toast to the beginning of the array for newest first
    toasts.value.unshift(toast)

    // Limit the number of toasts
    if (config.value.maxToasts && toasts.value.length > config.value.maxToasts) {
      toasts.value = toasts.value.slice(0, config.value.maxToasts)
    }

    // Auto-remove toast if not persistent
    if (!toast.persistent && toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(toast.id)
      }, toast.duration)
    }

    return toast.id
  }

  /**
   * Remove a toast by ID
   * @param id - Toast ID to remove
   */
  const removeToast = (id: string): void => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Clear all toasts
   */
  const clearToasts = (): void => {
    toasts.value = []
  }

  /**
   * Update toast configuration
   * @param newConfig - New configuration options
   */
  const updateConfig = (newConfig: Partial<ToastConfig>): void => {
    config.value = { ...config.value, ...newConfig }
  }

  // Convenience methods for different toast types
  const success = (message: string, options: Omit<ToastOptions, 'type'> = {}): string => {
    return addToast(message, { ...options, type: 'success' })
  }

  const error = (message: string, options: Omit<ToastOptions, 'type'> = {}): string => {
    return addToast(message, { ...options, type: 'error' })
  }

  const warning = (message: string, options: Omit<ToastOptions, 'type'> = {}): string => {
    return addToast(message, { ...options, type: 'warning' })
  }

  const info = (message: string, options: Omit<ToastOptions, 'type'> = {}): string => {
    return addToast(message, { ...options, type: 'info' })
  }

  return {
    // State
    activeToasts,
    config: computed(() => config.value),

    // Methods
    addToast,
    removeToast,
    clearToasts,
    updateConfig,

    // Convenience methods
    success,
    error,
    warning,
    info
  }
}

/**
 * Global toast instance for use across the application
 */
export const toast = useToast()
