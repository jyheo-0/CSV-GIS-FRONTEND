// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0'
  },
  css: ['vuetify/styles',
        '@/assets/styles/main.scss'
  ],
  build: {
    transpile: ['vuetify']
  },
})
