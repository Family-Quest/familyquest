// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  build: {
    transpile: ['konsta'],
  },
  typescript: {
    typeCheck: true
  },
  ssr: false,
  runtimeConfig: {
    public: {
      DEPLOY_PRIME_URL : process.env.DEPLOY_PRIME_URL,
      LOGIN_REDIRECT_URL: '',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@hebilicious/vue-query-nuxt',
    '@vee-validate/nuxt',
    'nuxt-icon',
    'nuxt-svgo',
  ],
  svgo: {
    defaultImport: 'component'
  },
  supabase: {
    redirect: false,
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    editorSupport: { autocompleteUtil: { as: 'tailwindClasses' }, generateConfig: true },
  },
  i18n: {
    defaultLocale: 'fr',
    detectBrowserLanguage: false,
    langDir: 'lang',
    lazy: true,
    locales: [
      {
        code: 'en',
        dir: 'ltr',
        file: 'en-EN.json',
        iso: 'en-EN',
        name: 'English',
      },
      {
        code: 'fr',
        dir: 'ltr',
        file: 'fr-FR.json',
        iso: 'fr-FR',
        name: 'Français',
      },
    ],
    vueI18n: './i18n.config.ts',
  },
})
