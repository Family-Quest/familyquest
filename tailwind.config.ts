// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
const config = konstaConfig({
  content: [
    './components/*.{tsvue}',
    './pages/*.{ts,vue}',
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  // darkMode: 'class', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
module.exports = config
