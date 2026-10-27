<script setup lang="ts">
const route = useRoute()

const tabs = [
  { label: 'Home', to: '/teacher', icon: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { label: 'Classes', to: '/teacher/classes', icon: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5' },
  { label: 'Account', to: '/teacher/account', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0' },
]
</script>

<template>
  <div class="min-h-dvh bg-base-100 md:grid md:grid-cols-[5rem_1fr] lg:grid-cols-[16rem_1fr]">
    <!-- Desktop sidebar -->
    <aside class="sticky top-0 hidden h-dvh flex-col gap-1 border-r border-base-300 bg-base-200 p-3 md:flex lg:p-4">
      <p class="hidden px-3 py-4 text-xl font-extrabold text-primary lg:block">Quran Class</p>
      <p class="py-4 text-center text-xl font-extrabold text-primary lg:hidden">QC</p>
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="btn btn-ghost justify-center gap-3 px-0 lg:justify-start lg:px-4" :aria-label="tab.label" :title="tab.label"
        :class="{ 'btn-active btn-primary': route.path === tab.to }"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path :d="tab.icon" />
        </svg>
        <span class="hidden lg:inline">{{ tab.label }}</span>
      </NuxtLink>
    </aside>

    <main class="min-w-0 pb-24 md:pb-10">
      <slot />
    </main>

    <!-- Mobile / tablet bottom dock -->
    <nav class="dock dock-md fixed inset-x-0 bottom-0 border-t border-base-300 bg-base-100 md:hidden">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        :class="{ 'dock-active': route.path === tab.to }"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path :d="tab.icon" />
        </svg>
        <span class="dock-label">{{ tab.label }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>
