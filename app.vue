<script lang="ts" setup>
const { data, error } = useFetchTutorByUser()
</script>

<template>
  <div class="w-full">
    <pre>DATA : {{ data }}</pre>
    <pre>ERROR : {{ error }}</pre>
    <NuxtWelcome />
  </div>
</template>
