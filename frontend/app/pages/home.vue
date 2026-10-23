<script setup lang="ts">
import { fetchHealth, type HealthResponse } from '~/api/health'

definePageMeta({ title: 'Home' })

const health = ref<HealthResponse>()
const error = ref<string>()

onMounted(async () => {
  try {
    health.value = await fetchHealth()
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
})
</script>

<template>
  <section>
    <h1>Home</h1>
    <p v-if="error">API error: {{ error }}</p>
    <p v-else-if="health">API status: {{ health.status }} ({{ health.time }})</p>
    <p v-else>Checking API…</p>
  </section>
</template>
