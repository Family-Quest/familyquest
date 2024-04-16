<script setup lang="ts">
const user = useSupabaseUser()
const { t } = useI18n()

watch(user, async () => {
  await (user.value ? navigateTo('/player-selection') : navigateTo('/'))
// eslint-disable-next-line @typescript-eslint/naming-convention
}, { immediate: true })
</script>

<template>
  <div>
    {{ t('common.redirect') }}
  </div>
</template>
