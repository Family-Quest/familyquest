// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  ssr: false,
  modules: ['@nuxtjs/ionic', '@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  ionic: {
    css: {
      utilities: true,
    },
  },
  supabase: {
    redirect: false,
  },
})
