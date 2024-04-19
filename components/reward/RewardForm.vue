<script setup lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import type { RewardInsertForm } from '~/types/reward.js'
import { kBlock, kButton, kList } from 'konsta/vue'

const props = defineProps<{
  familyId: string
}>()

const emit = defineEmits<{
  closeModal: [value: true]
}>()

const familyId = toRef(props, 'familyId')

const { isPending, mutateAsync } = useCreateReward()

const { t } = useI18n()

const { handleSubmit, resetForm } = useForm<RewardInsertForm>({
  initialValues: {
    family: familyId.value,
    rank: 1,
  },
})

const { value: name, errorMessage: errorMessageName } = useField<string>(
  'name',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.quest.name.required')
    return true
  },
)

const { value: description, errorMessage: errorMessageDescription } = useField<string>(
  'description',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.quest.description.required')
    return true
  },
)

const { value: gold, errorMessage: errorMessagePoint, setValue } = useField<number>(
  'gold',
  inputValue => {
    if(inputValue === 0) return t('form.error.quest.golds.required')
    if (inputValue < 0) return t('form.error.quest.golds.minValue')
    return true
  },
)

const { setValue: setRank } = useField<number>('rank')

const isDisabled = computed(() => !name.value || !description.value || !gold.value)

function onPointUpdate (value: string) {
  setValue(Number(value))
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync(values)
    resetForm()
    emit('closeModal', true)
  } catch {
    // eslint-disable-next-line no-console
    console.log('error')
  }

})
</script>

<template>
   <kBlock>
    <h3 class="font-light">
      {{ t('reward.admin.form.create.title') }}
    </h3>
    <kBlock>
      <kList>
        <form
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
            :model-value="String(gold)"
            :placeholder="t('form.placeholder.quest.golds')"
            type="number"
            @update:model-value="onPointUpdate"
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
  </kBlock>
</template>
