<template>
  <div class="relative size-full">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>

    <!-- Toast Container -->
    <toast-container />

    <!-- Global Modal Manager -->
    <modal-manager />
  </div>
</template>

<script setup lang="ts">
import ToastContainer from '~/src/modules/core/components/toast/ToastContainer.vue'
import ModalManager from '@/modules/core/components/modal/ModalManager.vue'
</script>

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
