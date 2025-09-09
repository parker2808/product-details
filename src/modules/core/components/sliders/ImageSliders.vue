<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex relative items-center justify-center border size-[36.75rem] border-border-gray"
    >
      <common-image :src="selectedImage" :alt="selectedImage" class="size-1/2 object-contain" />

      <div class="flex absolute right-2 bottom-2 gap-2">
        <button class="p-1 rounded-full bg-primary-gray" @click="selectPreviousImage">
          <inline-svg :src="arrowLeft" class="size-6" />
        </button>
        <button class="p-1 rounded-full bg-primary-gray" @click="selectNextImage">
          <inline-svg :src="arrowRight" />
        </button>
      </div>
    </div>

    <div class="flex gap-2 w-full overflow-x-auto">
      <div
        v-for="image in images"
        :key="image"
        class="flex-shrink-0 cursor-pointer border-2 transition-colors duration-200 w-fit"
        :class="
          image === selectedImage ? 'border-black' : 'border-transparent hover:border-border-gray'
        "
        @click="selectImage(image)"
      >
        <common-image :src="image" :alt="image" class="object-contain size-[8.625rem]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonImage from '@/modules/core/components/image/CommonImage.vue';
import arrowLeft from '~/src/assets/icons/arrow-left.svg';
import arrowRight from '~/src/assets/icons/arrow-right.svg';

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

<style scoped lang="scss"></style>
