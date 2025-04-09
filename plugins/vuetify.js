// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const customTheme = {
  dark: true,
  colors: {
    background: '#274C5E',
    surface: '#77919D',
    primary: '#DAE9F4',   // 텍스트, 버튼 등 강조 색
    secondary: '#7F9EB2', // 보조 강조
    error: '#ff6b6b',
    success: '#2ecc71',
    info: '#3498db',
    warning: '#f39c12',
  },
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
