import tsconfig from './tsconfig.json'
import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'

function readAliasPaths() {
  const paths = tsconfig.paths

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
  devtools: { enabled: true },

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/src/assets/style/index.scss'],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/src/assets/style/tailwind.css'
  },

  alias: {
    ...readAliasPaths()
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
  plugins: ['~/plugins/vue-inline-svg.client.ts']
})
