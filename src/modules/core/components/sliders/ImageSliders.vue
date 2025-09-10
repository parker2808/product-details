<template>
  <div class="flex flex-col gap-2 items-center w-fit">
    <div
      class="flex relative items-center justify-center border w-80 sm:w-96 md:w-96 lg:w-[36.75rem] h-64 sm:h-80 md:h-96 lg:min-h-[36.75rem] border-border-gray overflow-hidden"
    >
      <transition name="image-fade" mode="out-in">
        <common-image
          :key="selectedImage"
          :src="selectedImage"
          :alt="selectedImage"
          class="w-full h-full sm:w-3/4 sm:h-3/4 lg:size-1/2 object-contain"
        />
      </transition>

      <div class="flex absolute right-2 md:right-3 bottom-2 md:bottom-3 gap-2 md:gap-3">
        <button
          class="p-2 md:p-1.5 rounded-full bg-primary-gray bg-opacity-80 md:bg-opacity-100 transition-all duration-200 hover:bg-gray-300 hover:scale-110 active:scale-95"
          @click="selectPreviousImage"
        >
          <inline-svg :src="arrowLeft" class="size-6 md:size-5 lg:size-6" />
        </button>
        <button
          class="p-2 md:p-1.5 rounded-full bg-primary-gray bg-opacity-80 md:bg-opacity-100 transition-all duration-200 hover:bg-gray-300 hover:scale-110 active:scale-95"
          @click="selectNextImage"
        >
          <inline-svg :src="arrowRight" class="size-6 md:size-5 lg:size-6" />
        </button>
      </div>
    </div>

    <div
      class="flex gap-1 w-80 sm:w-96 md:w-96 lg:w-[36.75rem] overflow-x-auto py-1 scrollbar-hide"
    >
      <div
        v-for="image in images"
        :key="image"
        class="flex-shrink-0 cursor-pointer border-2 transition-all duration-200 w-fit hover:scale-105 m-1"
        :class="
          image === selectedImage
            ? 'border-black scale-105'
            : 'border-transparent hover:border-border-gray'
        "
        @click="selectImage(image)"
      >
        <common-image
          :src="image"
          :alt="image"
          class="object-contain size-16 sm:size-20 md:size-24 lg:size-[8.625rem]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonImage from '@/modules/core/components/image/CommonImage.vue'
import arrowLeft from '~/src/assets/icons/arrow-left.svg'
import arrowRight from '~/src/assets/icons/arrow-right.svg'

const props = defineProps<{
  images: string[]
}>()

const selectedImage = ref<string>(props.images[0])

const selectImage = (image: string) => {
  selectedImage.value = image
}

const selectPreviousImage = () => {
  const currentIndex = props.images.indexOf(selectedImage.value)
  const previousIndex = currentIndex === 0 ? props.images.length - 1 : currentIndex - 1
  selectedImage.value = props.images[previousIndex]
}

const selectNextImage = () => {
  const currentIndex = props.images.indexOf(selectedImage.value)
  const nextIndex = currentIndex === props.images.length - 1 ? 0 : currentIndex + 1
  selectedImage.value = props.images[nextIndex]
}
</script>

<style scoped lang="scss">
.image-fade-enter-active,
.image-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-fade-enter-from {
  opacity: 0;
  transform: scale(0.9) translateX(30px);
}

.image-fade-leave-to {
  opacity: 0;
  transform: scale(1.1) translateX(-30px);
}

.image-fade-enter-to,
.image-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateX(0);
}

// Hide scrollbar for webkit browsers
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
