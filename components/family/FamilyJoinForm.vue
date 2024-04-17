<script setup lang="ts">
import { kButton, kToast, kBlock, kBlockTitle, kList } from 'konsta/vue'
import type { FamilyInsertForm } from '~/types/family'

const { t } = useI18n()
const { handleSubmit, setFieldValue } = useForm<FamilyInsertForm>({
  initialValues: {
    password: '',
    name: '',
    pseudo: '',
  },
})

const user = useSupabaseUser()

const familyId = computed(() => String(user.value?.user_metadata.family))

const { data, isFetched } = useFetchFamilyById(familyId)
const { mutateAsync: joinFamily, isPending } = useJoinFamily(familyId)
const toastIsOpen = ref(false)
const toastMessage = ref('')

function toggleToast () {
  toastIsOpen.value = !toastIsOpen.value
}

const { errorMessage: errorMessageName, value: name } = useField<string>(
  'name',
  inputValue => {
    if(inputValue.length === 0) return t('form.error.family-name.required')
    return true
  },
  {
    initialValue: data.value?.name,
  },
)

const { errorMessage: errorMessagePseudo, value: pseudo } = useField<string>(
  'pseudo',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

const { errorMessage: errorMessagePassword, value: password } = useField<string>(
  'password',
  inputValue => {
    if(!/^\d{6}$/u.test(inputValue)) return t('form.error.code.length')
    return true
  },
)


const onSubmit = handleSubmit(async values => {
  try {
    await joinFamily(values)
    await navigateTo('/member-selection')
  } catch {
    toastMessage.value = t('common.error.save')
    toggleToast()
    setTimeout(toggleToast, 7000)
  }
})

watch(isFetched, () => {
  setFieldValue('name', data.value?.name ?? '')
})
</script>

<template>
  <kBlock v-if="isPending" class="text-center">
    <kPreloader size="w-16 h-16" />
  </kBlock>
  <div v-else>
    <kBlockTitle>{{ t('family.join.title') }}</kBlockTitle>
    <kBlock inset strong>
      <form
        class="flex flex-col gap-3"
        novalidate
        @submit.prevent="onSubmit"
      >
        <kList margin="my-none">
          <CoreInputText
            v-model="name"
            disabled
            :error-messages="errorMessageName"
            icon="material-symbols:home"
            :label="t('form.label.family-name')"
            :placeholder="t('form.label.family-name')"
            required
          />
          <CoreInputText
            v-model="pseudo"
            :error-messages="errorMessagePseudo"
            icon="material-symbols:person"
            :label="t('form.label.pseudo')"
            :placeholder="t('form.label.pseudo')"
            required
          />
          <CoreInputText
            v-model="password"
            :error-messages="errorMessagePassword"
            :hint="t('form.hint.code')"
            icon="material-symbols:lock"
            :label="t('form.label.code')"
            :placeholder="t('form.label.code')"
            required
            type="password"
          />
        </kList>
        <div class="flex flex-row-reverse">
          <kButton type="submit">
            {{ t('common.join') }}
          </kButton>
        </div>
      </form>
    </kBlock>
    <kToast :opened="toastIsOpen" position="right">
      <span class="flex-1">{{ toastMessage }}</span>
    </kToast>
  </div>
</template>
