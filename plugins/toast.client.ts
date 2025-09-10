import { toast } from '@/modules/core/composables/use-toast'

export default defineNuxtPlugin(() => {
  // Make toast globally available
  return {
    provide: {
      toast
    }
  }
})

// Type declaration for global $toast
declare module '#app' {
  type NuxtApp = {
    $toast: typeof toast
  }
}

declare module 'vue' {
  type ComponentCustomProperties = {
    $toast: typeof toast
  }
}
