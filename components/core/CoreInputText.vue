<script setup lang="ts">
import { kListInput } from 'konsta/vue'
import type { InputTypeHTMLAttribute } from 'vue'
const model = defineModel<string>()

const props = withDefaults(defineProps<{
  disabled?: boolean
  errorMessages?: string
  hint?: string
  icon?: string
  label?: string
  placeholder?: string
  required?: boolean
  type?: InputTypeHTMLAttribute
}>(), {
  errorMessages: '',
  hint: '',
  icon: '',
  label: '',
  placeholder: '',
  type: 'text',
})

const { type } = toRefs(props)

const currentType = ref(type.value)

const currentLabel = computed(() => `${props.label}${props.required ? ' *' : ''}`)
const hiddenIcon = computed(() => currentType.value === 'password' ? 'material-symbols:visibility' : 'material-symbols:visibility-off')

function updateType () {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="flex items-center">
    <kListInput
      :disabled
      :error="errorMessages"
      floating-label
      :info="hint"
      :label="currentLabel"
      outline
      :placeholder
      :required
      :type="currentType"
      :value="model"
      @input="model = $event.target.value"
    >
      <template #media>
        <Icon
          v-if="icon"
          slot="start"
          aria-hidden="true"
          class="size-6"
          :name="icon"
        />
      </template>
    </kListInput>
    <Icon
        v-if="props.type === 'password'"
        class="size-6"
        :name="hiddenIcon"
        @click="updateType"
      />
  </div>
</template>
