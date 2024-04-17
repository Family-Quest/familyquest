<script setup lang="ts">
import { kBlock, kBlockTitle, kPreloader } from 'konsta/vue'

const props = defineProps<{
  familyId: string
}>()

const familyId = toRef(props, 'familyId')

const { data, isPending } = useFetchMembersByFamily(familyId)

const { t } = useI18n()

</script>

<template>
  <kBlock v-if="isPending" class="text-center">
    <kPreloader size="w-16 h-16" />
  </kBlock>
  <div v-else>
    <kBlockTitle class="text-white">{{  t('page.member.list.title') }}</kBlockTitle>
    <kBlock class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="member in data" :key="member.id" class="flex flex-col rounded-md border border-gray-200 bg-white p-2.5 text-center hover:border-gray-400 sm:rounded-lg sm:p-5">
        <h2 class="text-xl">{{ member.pseudo }}</h2>
        <span class="text-gray-500">{{ t(`common.${member.role}`) }}</span>
      </div>
    </kBlock>
  </div>
</template>
