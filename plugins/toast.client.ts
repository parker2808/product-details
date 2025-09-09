import { toast } from '@/modules/core/composables/use-toast'

export default defineNuxtPlugin(() => {
  // Make toast globally available
  return {
    provide: {
      toast: toast
    }
  }
})

// Type declaration for global $toast
declare module '#app' {
  interface NuxtApp {
    $toast: typeof toast
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: typeof toast
  }
}
