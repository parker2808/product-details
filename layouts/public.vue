<template>
  <div class="layout">
    <div class="layout_head">
      <slot name="head" />
    </div>
    <div class="layout_body">
      <slot />
    </div>
    <div class="layout_footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  @apply flex h-screen w-screen flex-col bg-white;

  .layout_head {
    z-index: 4;
  }
  .layout_body {
    @apply mb-2 flex overflow-y-auto;
  }
}
@media screen and (max-width: 768px) {
  .layout {
    @apply relative h-fit;

    .layout_head {
      @apply fixed left-0 right-0 top-0 z-50;
    }
    .layout_body {
      @apply mt-5;
    }
  }
}
</style>
