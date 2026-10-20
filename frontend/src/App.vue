<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { fetchHealth } from '@/api/health'

const health = ref<'loading' | 'ok' | 'down'>('loading')
const serverTime = ref('')

onMounted(async () => {
  try {
    const res = await fetchHealth()
    health.value = res.status === 'ok' ? 'ok' : 'down'
    serverTime.value = res.time
  } catch {
    health.value = 'down'
  }
})
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p data-testid="health" :data-status="health">
    API status:
    <span v-if="health === 'loading'">checking…</span>
    <span v-else-if="health === 'ok'">healthy (server time {{ serverTime }})</span>
    <span v-else>unavailable</span>
  </p>
</template>

<style scoped></style>
