import tsconfig from './tsconfig.json'
import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'

function readAliasPaths() {
  const { paths } = tsconfig

  return Object.entries(paths).reduce(
    (alias: Record<string, string>, [key, value]) => {
      const aliasKey = key.replace('/*', '')
      const pathItem = value[0]
      alias[aliasKey] = path.resolve(__dirname, pathItem.replace('*', ''))

      return alias
    },
    {} as Record<string, string>
  )
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-10',
  devtools: { enabled: true },

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      },
      include: ['./types/**/*']
    }
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/src/assets/style/index.scss', 'animate.css'],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/src/assets/style/tailwind.css'
  },

  alias: {
    ...readAliasPaths()
  },

  // Vite configuration for asset handling
  vite: {
    resolve: {
      alias: {
        ...readAliasPaths()
      }
    },
    assetsInclude: ['**/*.svg']
  },

  // App configuration
  app: {
    head: {
      title: 'Product Details',
      link: [{ rel: 'icon', href: '/favicon.png' }],
      htmlAttrs: {
        class: 'app-theme'
      }
    },
    rootId: 'app'
  },

  // Development configuration
  ssr: false,

  routeRules: {
    // Enable SSR for product route for better SEO
    '/product': { ssr: true },
    '/**': { ssr: false }
  },

  // Runtime configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    // apiSecret: process.env.API_SECRET,

    // Public keys (exposed to client-side)
    public: {
      // baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  },

  vue: {
    runtimeCompiler: true
  },

  // Plugins configuration
  plugins: ['~/plugins/vue-inline-svg.client.ts', '~/plugins/toast.client.ts']
})
