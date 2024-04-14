// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: './',
      },
    },
    typeCheck: true
  },
  ssr: false,
  modules: [
    '@nuxtjs/ionic',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@hebilicious/vue-query-nuxt'
  ],
  ionic: {
    css: {
      utilities: true,
    },
  },
  supabase: {
    redirect: false,
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    editorSupport: { autocompleteUtil: { as: 'tailwindClasses' }, generateConfig: true },
  },
  runtimeConfig: {
    public: {
      DEPLOY_PRIME_URL : process.env.DEPLOY_PRIME_URL,
      LOGIN_REDIRECT_URL: '',
    },
  },
})
