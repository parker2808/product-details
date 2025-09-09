<template>
  <teleport to="body">
    <div
      v-if="toasts.length > 0"
      :class="containerPositionClasses"
      class="fixed z-50 p-4 pointer-events-none"
    >
      <transition-group
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="transform translate-x-0 opacity-100 scale-100"
        leave-to-class="transform translate-x-full opacity-0 scale-95"
        move-class="transition-transform duration-300 ease-out"
        tag="div"
        class="space-y-3"
      >
        <toast-item
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          :show-progress-bar="showProgressBar"
          class="pointer-events-auto"
          @remove="removeToast(toast.id)"
        />
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from '@/modules/core/composables/use-toast'
import ToastItem from './ToastItem.vue'

const props = withDefaults(
  defineProps<{
    showProgressBar?: boolean
  }>(),
  {
    showProgressBar: true
  }
)

const { activeToasts, config, removeToast } = useToast()

const toasts = computed(() => activeToasts.value)

/**
 * Container position classes based on configuration
 */
const containerPositionClasses = computed(() => {
  const position = config.value.position || 'top-right'

  const positions = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
  }

  return positions[position]
})
</script>

<style scoped>
/* Additional styles for better performance */
.space-y-3 > * + * {
  margin-top: 0.75rem;
}

/* Ensure smooth transitions */
.transition-all {
  transition-property: all;
}
</style>
