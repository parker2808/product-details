<script setup lang="ts">
import { PUBLIC_ROUTE } from '@/modules/core/enums/public-routes.enum'

definePageMeta({
  name: PUBLIC_ROUTE.TEST,
  layout: 'public'
})
</script>

<template>
  <div class="home-page w-full">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Product Details</h1>
        <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
          Discover our comprehensive product catalog with detailed specifications and customization
          options
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/product"
            class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Browse Products
          </NuxtLink>
          <button
            class="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-700 transition-colors duration-200"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Products?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer premium quality products with extensive customization options
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p class="text-gray-600">Premium materials and craftsmanship in every product</p>
          </div>

          <!-- Feature 2 -->
          <div
            class="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Customizable</h3>
            <p class="text-gray-600">Extensive options for size, color, and finishes</p>
          </div>

          <!-- Feature 3 -->
          <div
            class="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p class="text-gray-600">Quick turnaround times and reliable shipping</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our full product range and find the perfect solution for your needs
        </p>
        <NuxtLink
          to="/product"
          class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
        >
          View All Products
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
