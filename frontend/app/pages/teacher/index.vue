<script setup lang="ts">
definePageMeta({ layout: 'teacher', title: 'Teacher dashboard' })

interface Session {
  id: number
  time: string
  period: string
  name: string
  students: number
  status: 'due' | 'upcoming'
}

interface ClassSummary {
  id: number
  name: string
  students: number
  schedule: string
}

// Placeholder data until the API exposes teacher endpoints.
const masjid = 'Masjid Al-Noor'
const teacher = { name: 'Ustadh Bilal', initials: 'UB' }
const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

const sessions: Session[] = [
  { id: 1, time: '10:00', period: 'AM', name: 'Hifz Juz Amma', students: 12, status: 'due' },
  { id: 2, time: '1:00', period: 'PM', name: 'Qaida beginners', students: 8, status: 'upcoming' },
]

const classes: ClassSummary[] = [
  { id: 1, name: 'Hifz Juz Amma', students: 12, schedule: 'Sat & Sun 10am' },
  { id: 2, name: 'Qaida beginners', students: 8, schedule: 'Sat 1pm' },
  { id: 3, name: 'Tajweed level 2', students: 9, schedule: 'Sun 1pm' },
]

const nextDue = computed(() => sessions.find((s) => s.status === 'due'))
</script>

<template>
  <div>
    <!-- Top bar -->
    <header class="navbar bg-primary px-5 text-primary-content md:px-8">
      <div class="flex-1">
        <button class="flex items-center gap-2 text-lg font-bold">
          {{ masjid }}
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </div>
      <div class="avatar avatar-placeholder">
        <div class="w-10 rounded-full bg-secondary text-sm font-bold text-secondary-content">
          {{ teacher.initials }}
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-5xl space-y-6 px-4 pt-4 md:space-y-8 md:px-8 md:pt-8">
      <div class="grid items-center gap-6 md:grid-cols-2">
      <!-- Greeting -->
      <section>
        <p class="text-sm text-base-content/60">{{ today }}</p>
        <h1 class="text-3xl leading-tight font-extrabold md:text-4xl">
          Assalamu alaikum,
          <span class="block w-fit text-primary underline decoration-secondary decoration-4 underline-offset-4">{{ teacher.name }}</span>
        </h1>
      </section>

      <!-- Attendance prompt -->
      <section v-if="nextDue" class="card border border-base-300 bg-base-100">
        <div class="card-body gap-4 p-4">
          <div class="flex items-center gap-3">
            <div class="grid size-11 shrink-0 place-items-center rounded-xl bg-base-300 text-primary">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM9 12h6M9 16h4" /></svg>
            </div>
            <div>
              <h2 class="font-bold">Attendance not taken</h2>
              <p class="text-sm text-base-content/60">{{ nextDue.name }} · Today, {{ nextDue.time }}:00 {{ nextDue.period }}</p>
            </div>
          </div>
          <NuxtLink to="/teacher/attendance" class="btn btn-primary btn-block">
            Take attendance
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </NuxtLink>
        </div>
      </section>
      </div>

      <!-- Today's sessions -->
      <section class="space-y-3">
        <div>
          <p class="flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
            <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            Today
          </p>
          <h2 class="text-2xl font-bold">Your sessions</h2>
        </div>

        <div class="grid gap-3 md:grid-cols-2">
        <NuxtLink
          v-for="s in sessions"
          :key="s.id"
          :to="`/teacher/classes/${s.id}`"
          class="card flex-row items-center gap-4 border border-base-300 bg-base-100 p-4"
        >
          <div class="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-base-300 text-primary">
            <span class="text-xl leading-none font-extrabold">{{ s.time }}</span>
            <span class="text-xs font-bold">{{ s.period }}</span>
          </div>
          <div class="flex-1 space-y-1">
            <h3 class="text-lg font-bold">{{ s.name }}</h3>
            <p class="text-sm text-base-content/60">{{ s.students }} students</p>
            <span v-if="s.status === 'due'" class="badge badge-sm badge-soft badge-primary font-semibold">Attendance due</span>
            <span v-else class="badge badge-sm badge-outline badge-primary font-semibold">Upcoming</span>
          </div>
          <svg class="size-5 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </NuxtLink>
        </div>
      </section>

      <!-- Classes -->
      <section class="space-y-3">
        <div class="flex items-end justify-between">
          <div>
            <p class="flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
              <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" /></svg>
              Classes
            </p>
            <h2 class="text-2xl font-bold">Your classes</h2>
          </div>
          <NuxtLink to="/teacher/classes" class="link font-bold text-primary no-underline">See all</NuxtLink>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="c in classes"
          :key="c.id"
          :to="`/teacher/classes/${c.id}`"
          class="card flex-row items-center justify-between bg-base-300/60 p-5"
        >
          <div>
            <h3 class="text-lg font-bold">{{ c.name }}</h3>
            <p class="text-sm text-base-content/70">{{ c.students }} students · {{ c.schedule }}</p>
          </div>
          <!-- Mihrab motif -->
          <svg class="h-12 w-10 shrink-0" viewBox="0 0 40 48" aria-hidden="true">
            <circle cx="20" cy="3" r="3" class="fill-primary" />
            <path d="M2 48V26a18 18 0 0 1 36 0v22z" class="fill-secondary" />
            <path d="M11 48V30a9 9 0 0 1 18 0v18z" class="fill-primary" />
          </svg>
        </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
