<script setup lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import type { QuestInsertForm } from '~/types/quest'
import { kBlock, kButton, kList, kPreloader } from 'konsta/vue'

const props = defineProps<{
  familyId: string
}>()

const emit = defineEmits<{
  closeModal: [value: true]
}>()

const familyId = toRef(props, 'familyId')

const { isPending, mutateAsync } = useCreateQuest()

const { t } = useI18n()

const { handleSubmit, resetForm } = useForm<QuestInsertForm>({
  initialValues: {
    family: familyId.value,
    rank: 1,
    status: 'toDo',
  },
})

const { errorMessage: errorMessageName, value: name } = useField<string>(
  'name',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.quest.name.required')
    return true
  },
)

const { errorMessage: errorMessageDescription, value: description } = useField<string>(
  'description',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.quest.description.required')
    return true
  },
)

const { errorMessage: errorMessagePoint, setValue, value: gold } = useField<number>(
  'gold',
  inputValue => {
    if(inputValue === 0) return t('form.error.quest.golds.required')
    if (inputValue < 0) return t('form.error.quest.golds.minValue')
    return true
  },
)

const { setValue: setRank } = useField<number>('rank')

const isDisabled = computed(() => !name.value || !description.value || !gold.value)

const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync(values)
    resetForm()
    emit('closeModal', true)
  } catch {
    // eslint-disable-next-line no-console
    console.error('error')
  }
})

function onGoldUpdate (value: string) {
  setValue(Number(value))
}
</script>

<template>
  <kBlock>
    <h3 class="text-lg font-light">
      {{ t('quest.admin.form.create.title') }}
    </h3>
    <kList>
      <form
        class="flex flex-col items-center justify-center gap-5"
        @submit.prevent="onSubmit"
      >
        <CoreInputText
          v-model="name"
          :error-messages="errorMessageName"
          :label="t('form.label.quest.name')"
          :placeholder="t('form.placeholder.quest.name')"
          type="text"
        />
        <CoreInputText
          v-model="description"
          :error-messages="errorMessageDescription"
          :label="t('form.label.quest.description')"
          :placeholder="t('form.placeholder.quest.description')"
          type="textarea"
        />
        <CoreInputText
          :error-messages="errorMessagePoint"
          :label="t('form.label.quest.golds')"
          :placeholder="t('form.placeholder.quest.golds')"
          type="number"
          @update:model-value="onGoldUpdate"
        />
        <div class="flex w-full justify-around">
          <input checked name="rating-1" type="radio" @click="setRank(1)" />
          <input name="rating-1" type="radio" @click="setRank(2)" />
          <input name="rating-1" type="radio" @click="setRank(3)" />
        </div>
        <k-button
          :disabled="isDisabled"
          large
          outline
          rounded
          type="submit"
        >
        <k-preloader v-if="isPending"/>
        <span v-else>{{ t('common.add') }}</span>
        </k-button>
        <k-button
          large
          outline
          rounded
          type="reset"
        >
          {{ t('common.cancel') }}
        </k-button>
      </form>
    </kList>
  </kBlock>
</template>
