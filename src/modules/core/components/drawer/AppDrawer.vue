<template>
  <teleport to="body">
    <!-- Backdrop -->
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="onBackdropClick"
      />
    </transition>

    <!-- Drawer -->
    <transition
      :enter-active-class="`animate__animated ${enterAnimationClass}`"
      :leave-active-class="`animate__animated ${leaveAnimationClass}`"
    >
      <div v-if="visible" class="fixed bg-white shadow-lg z-50" :class="[positionClasses, sizeClasses]">
        <!-- Header -->
        <div
          v-if="!hideHeader"
          class="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <div class="flex items-center">
            <slot name="header">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ title }}
              </h3>
            </slot>
          </div>
          <button
            v-if="!hideCloseButton"
            class="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click="onClose"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto" :class="contentClass">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="p-4 border-t border-gray-200">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import type { ModalPosition } from '@/modules/core/types/entities/modal.type'

type Props = {
  /** Whether the drawer is visible */
  visible: boolean
  /** Drawer title */
  title?: string
  /** Drawer position */
  position?: ModalPosition
  /** Custom size classes */
  size?: string
  /** Hide header */
  hideHeader?: boolean
  /** Hide close button */
  hideCloseButton?: boolean
  /** Content padding class */
  contentClass?: string
  /** Close on backdrop click */
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  position: 'right',
  size: 'w-full md:w-[32rem] lg:w-[32rem]',
  hideHeader: false,
  hideCloseButton: false,
  contentClass: 'p-4',
  closeOnBackdrop: true
})

const emit = defineEmits<{
  close: []
  'update:visible': [value: boolean]
}>()

/**
 * Position-based classes for the drawer
 */
const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'top-0 left-0 right-0'
    case 'bottom':
      return 'bottom-0 left-0 right-0'
    case 'left':
      return 'top-0 left-0 bottom-0'
    case 'right':
    default:
      return 'top-0 right-0 bottom-0'
  }
})

/**
 * Size classes based on position
 */
const sizeClasses = computed(() => {
  if (props.position === 'top' || props.position === 'bottom') {
    return 'h-auto max-h-96'
  }
  return props.size
})

/**
 * Animation classes based on position using animate.css
 */
const enterAnimationClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'animate__slideInDown'
    case 'bottom':
      return 'animate__slideInUp'
    case 'left':
      return 'animate__slideInLeft'
    case 'right':
    default:
      return 'animate__slideInRight'
  }
})

const leaveAnimationClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'animate__slideOutUp'
    case 'bottom':
      return 'animate__slideOutDown'
    case 'left':
      return 'animate__slideOutLeft'
    case 'right':
    default:
      return 'animate__slideOutRight'
  }
})

/**
 * Handle close event
 */
const onClose = () => {
  emit('close')
  emit('update:visible', false)
}

/**
 * Handle backdrop click
 */
const onBackdropClick = () => {
  if (props.closeOnBackdrop) {
    onClose()
  }
}

// Handle escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.visible) {
      onClose()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>
