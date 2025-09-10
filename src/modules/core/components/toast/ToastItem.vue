<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
  >
    <div
      v-if="visible"
      :class="toastClasses"
      class="relative mb-3 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 overflow-hidden"
      role="alert"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Icon -->
      <div class="flex items-start p-4">
        <div class="flex-shrink-0">
          <!-- Custom Icon -->
          <template v-if="toast.icon">
            <inline-svg :src="toast.icon" :class="iconClasses" class="w-5 h-5" />
          </template>
          <!-- Default Type Icon -->
          <template v-else>
            <component :is="iconComponent" :class="iconClasses" class="w-5 h-5" />
          </template>
        </div>

        <!-- Content -->
        <div class="ml-3 flex-1">
          <h4 v-if="toast.title" class="text-sm font-semibold text-gray-900 mb-1">
            {{ toast.title }}
          </h4>
          <p class="text-sm text-gray-700">
            {{ toast.message }}
          </p>
        </div>

        <!-- Close Button -->
        <button
          v-if="!toast.persistent"
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close notification"
          @click="$emit('remove')"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div
        v-if="!toast.persistent && toast.duration && showProgressBar"
        class="absolute bottom-0 left-0 h-1 bg-gray-200"
        :style="{ width: '100%' }"
      >
        <div
          :class="progressBarClasses"
          class="h-full transition-all ease-linear"
          :style="{ width: progressWidth + '%' }"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Toast } from '@/modules/core/types/entities/toast.type'

const props = withDefaults(
  defineProps<{
    toast: Toast
    showProgressBar?: boolean
  }>(),
  {
    showProgressBar: true
  }
)

const emit = defineEmits<{
  remove: []
}>()

const visible = ref(false)
const progressWidth = ref(100)
const startTime = ref(0)
let progressInterval: NodeJS.Timeout | null = null
let autoRemoveTimeout: NodeJS.Timeout | null = null
const isPaused = ref(false)
const remainingTime = ref(0)

/**
 * Toast styling classes based on type
 */
const toastClasses = computed(() => {
  const baseClasses = 'toast-item'
  const typeClasses = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500'
  }

  return [baseClasses, typeClasses[props.toast.type]].join(' ')
})

/**
 * Icon classes based on toast type
 */
const iconClasses = computed(() => {
  const typeClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }

  return typeClasses[props.toast.type]
})

/**
 * Progress bar classes based on toast type
 */
const progressBarClasses = computed(() => {
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }

  return typeClasses[props.toast.type]
})

/**
 * Icon component based on toast type
 */
const iconComponent = computed(() => {
  const icons = {
    success: () =>
      h(
        'svg',
        {
          fill: 'currentColor',
          viewBox: '0 0 20 20'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
            'clip-rule': 'evenodd'
          })
        ]
      ),
    error: () =>
      h(
        'svg',
        {
          fill: 'currentColor',
          viewBox: '0 0 20 20'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z',
            'clip-rule': 'evenodd'
          })
        ]
      ),
    warning: () =>
      h(
        'svg',
        {
          fill: 'currentColor',
          viewBox: '0 0 20 20'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
            'clip-rule': 'evenodd'
          })
        ]
      ),
    info: () =>
      h(
        'svg',
        {
          fill: 'currentColor',
          viewBox: '0 0 20 20'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
            'clip-rule': 'evenodd'
          })
        ]
      )
  }

  return icons[props.toast.type]
})

/**
 * Start the progress animation
 */
const startProgress = () => {
  if (!props.toast.duration || props.toast.persistent) return

  startTime.value = Date.now()
  remainingTime.value = props.toast.duration

  progressInterval = setInterval(() => {
    if (isPaused.value) return

    const elapsed = Date.now() - startTime.value
    const remaining = Math.max(0, props.toast.duration! - elapsed)
    const percentage = (remaining / props.toast.duration!) * 100

    progressWidth.value = percentage
    remainingTime.value = remaining

    if (remaining <= 0) {
      stopProgress()
    }
  }, 16) // ~60fps
}

/**
 * Stop the progress animation
 */
const stopProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

/**
 * Pause progress on mouse enter
 */
const handleMouseEnter = () => {
  isPaused.value = true
  if (autoRemoveTimeout) {
    clearTimeout(autoRemoveTimeout)
    autoRemoveTimeout = null
  }
}

/**
 * Resume progress on mouse leave
 */
const handleMouseLeave = () => {
  if (!props.toast.persistent && remainingTime.value > 0) {
    isPaused.value = false
    startTime.value = Date.now() - (props.toast.duration! - remainingTime.value)

    // Set timeout for remaining time
    autoRemoveTimeout = setTimeout(() => {
      emit('remove')
    }, remainingTime.value)
  }
}

onMounted(() => {
  // Show toast with slight delay for animation
  setTimeout(() => {
    visible.value = true
  }, 50)

  // Start progress and auto-remove timer
  if (!props.toast.persistent && props.toast.duration) {
    startProgress()

    autoRemoveTimeout = setTimeout(() => {
      emit('remove')
    }, props.toast.duration)
  }
})

onBeforeUnmount(() => {
  stopProgress()
  if (autoRemoveTimeout) {
    clearTimeout(autoRemoveTimeout)
  }
})
</script>

<style scoped>
.toast-item {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
