<script lang="ts" setup>
import { kBlock, kButton, kList, kPage, kToast } from 'konsta/vue'
import type { UserForm } from '~/types/user'

const { t } = useI18n()

const { handleSubmit } = useForm<UserForm>()
const runtimeConfig = useRuntimeConfig()
const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL || runtimeConfig.public.LOGIN_REDIRECT_URL }/confirm`
const supabase = useSupabaseClient()
const toastIsOpen = ref(false)
const loginErrorMessage = ref('')

const { errorMessage: errorMessageEmail, value: email } = useField<string>(
  'email',
  inputValue => {
    const emailValidationRegExp = /^[\w!#$%&'*+./=?^`{|}~-]+@[\d.A-Za-z-]+$/mu
    if (inputValue && inputValue.length === 0) return t('form.error.email.required')
    if (!emailValidationRegExp.test(inputValue)) return t('form.error.email.invalid')
    return true
  },
)

const { errorMessage: errorMessagePassword, value: password } = useField<string>(
  'password',
  inputValue => {
    if (inputValue && inputValue.length === 0) return t('form.error.password.required')
    return true
  },
)

function toggleToast () {
  toastIsOpen.value = !toastIsOpen.value
}

const logIn = handleSubmit(async (values) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error) {
    loginErrorMessage.value = error.message === 'Email not confirmed' ? t('common.error.email_not_confirmed') : t('common.error.login')
    toggleToast()
    setTimeout(toggleToast, 7000)
  } else await navigateTo('/player-selection')
})


async function signInWithGoogle () {
  const { error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo,
    },
    provider: 'google',
  })
  if (error) throw createError(error)
}
</script>

<template>
  <kPage class="bg-[url('public/back.png')] bg-cover">
    <kBlock>
      <SvgoLogoText class="fill-white object-cover" />
    </kBlock>
    <kBlock inset outline strong>
      <h2 class="text-xl font-bold">{{ t('common.login') }}</h2>
      <div class="mb-5 flex flex-col">
        <kList margin="my-none">
          <CoreInputText
            v-model="email"
            :error-messages="errorMessageEmail"
            icon="material-symbols:mail"
            :label="t('common.email')"
            :placeholder="t('common.email')"
            required
            type="email"
          />
          <CoreInputText
            v-model="password"
            :error-messages="errorMessagePassword"
            icon="material-symbols:lock"
            :label="t('common.password')"
            :placeholder="t('common.password')"
            required
            type="password"
          />
        </kList>
        <kButton @click="logIn">{{ t('common.login') }}</kButton>
      </div>
      <hr class="my-6 h-px border-0 bg-gray-200 dark:bg-gray-700">
      <kButton class="w-full" @click="signInWithGoogle">
        <Icon
          class="mr-2 h-full w-8 rounded-full bg-white p-1"
          name="logos:google-icon"
        />
        <span>{{ t('common.loginWithGoogle') }}</span>
      </kButton>
      <hr class="my-6 h-px border-0 bg-gray-200 dark:bg-gray-700">
      <div>
        <p class="text-xs">{{ t('common.not-have-account') }}</p>
        <nuxt-link
          class="w-fit text-sm hover:text-[#42b883]"
          to="/register"
        >
          {{ t('common.register') }}
        </nuxt-link>
      </div>
    </kBlock>
    <kToast :opened="toastIsOpen" position="right">
      <span class="flex-1">{{ loginErrorMessage }}</span>
    </kToast>
  </kPage>
</template>
