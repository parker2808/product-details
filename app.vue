<script setup lang="ts">
import ToastContainer from '@/modules/core/components/toast/toast-container.vue'
</script>

<template>
  <div class="relative size-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Toast Container -->
    <toast-container />
  </div>
</template>

<style scoped lang="scss">
.app-theme {
  font-family: Roboto, sans-serif;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
  background: #ffffff;
  font-weight: 400;
}
</style>
