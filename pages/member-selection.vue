<script setup lang="ts">
import { kBlock, kPage, kPreloader } from 'konsta/vue'

definePageMeta({
  middleware: [
    'auth',
  ],
})

const { data, isFetched, isLoading } = useFetchFamilyByUser()
</script>

<template>
  <kPage class="bg-[url('public/back.png')] bg-cover">
    <kBlock v-if="isLoading" inset outline strong>
      <kPreloader size="w-16 h-16" />
    </kBlock>
    <MemberList v-else-if="isFetched && data" :family-id="data.id" />
    <FamilyCreationForm v-else />
  </kPage>
</template>
