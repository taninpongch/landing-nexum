// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      payrollURL: process.env.NUXT_PUBLIC_URL_PAYROLL,
      nexumURL: process.env.NUXT_PUBLIC_URL_NEXUM,
      topupPayrollURL: process.env.NUXT_PUBLIC_URL_TOPUP_PAYROLL,
      topupAllowanceURL: process.env.NUXT_PUBLIC_URL_TOPUP_ALLOWANCE
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/google-fonts'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // googleFonts: {
  //   families: {
  //     'Noto Sans Thai': true,
  //   },
  //   download: true,
  // },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: [
        '/'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  vite: {
    server: {
      allowedHosts: true
    }
  }
})
