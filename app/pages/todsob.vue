<template>
  <section class="px-4 lg:px-4 py-8 lg:py-5">
    <section class="todsob-shell rounded-3xl p-4 sm:p-6 lg:p-8">
      <header class="mb-5 lg:mb-6">
        <p class="text-xl text-neutral-600">ยินดีตอนรับสู่ Nexum</p>
        <h1 class="text-4xl font-semibold tracking-tight text-neutral-900">เลือกบริการที่ต้องการใช้งาน</h1>
      </header>

      <div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div class="grid gap-4 sm:grid-cols-2 ">
          <UCard v-for="service in mainServices" :key="service.title"
            class="todsob-service-card h-full border-0 text-white cursor-pointer " :ui="{
              root: 'h-full rounded-3xl',
              body: 'p-6 lg:p-7 flex h-full flex-col'
            }" @click="openLink(service.to)">
            <UIcon :name="service.icon" class="mb-7 size-48 text-yellow-300 mt-10" />
            <h2 class="text-4xl font-bold leading-tight">{{ service.title }}</h2>
            <p class="mt-1 text-3xl text-sky-100">{{ service.description }}</p>
            <ULink :to="service.to"
              class=" inline-flex items-center gap-1 text-xl font-semibold text-yellow-300 transition hover:text-yellow-200  mb-10 mt-1">
              เข้าใช้งาน
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </ULink>
          </UCard>

          <UCard v-for="action in quickActions" :key="action.title" class="border-0 cursor-pointer " :ui="{
            root: 'rounded-2xl bg-slate-200/80',
            body: 'p-5 flex items-center gap-4'
          }" @click="openLink(action.to)">
            <UAlert variant="soft" :title="action.title" :description="action.description" :icon="action.icon" :ui="{
              root: 'rounded-2xl border-0 bg-transparent p-0 items-center',
              title: 'text-3xl font-semibold text-sky-900',
              description: 'text-2xl text-slate-600',
              icon: 'w-[100px] h-[100px] text-sky-700'
            }" :close="{
              ui: {
                leadingIcon: 'size-[50px]'
              }
            }" close-icon="i-lucide-chevron-right" />
          </UCard>
        </div>

        <aside class="grid gap-4">
          <UCard class="border-0" :ui="{ root: 'rounded-2xl bg-white', body: 'p-5' }">
            <div class="mb-3 flex items-center justify-between">
              <h3 class="text-2xl font-semibold text-neutral-900">ข่าวสาร</h3>
              <ULink to="/news" class="text-xl text-sky-700 hover:text-sky-800">ดูทั้งหมด</ULink>
            </div>

            <div class="space-y-3">
              <article v-for="news in newsItems" :key="news.title"
                class="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <div class="mb-1 flex items-start justify-between gap-2">
                  <h4 class="text-xl font-medium text-slate-900">{{ news.title }}</h4>
                  <UBadge :label="news.statusText || news.status" :color="news.badgeColor" variant="soft"
                    class="shrink-0 rounded-full text-sm" />
                </div>
                <p class="text-base text-slate-500">{{ news.description }}</p>
                <p class="mt-0.5 text-sm text-slate-400">{{ news.date }}</p>
              </article>
            </div>
          </UCard>

          <UCard class="border-0" :ui="{ root: 'rounded-2xl bg-white', body: 'p-5' }">
            <h3 class="mb-3 text-2xl font-semibold text-neutral-900">ศูนย์ช่วยเหลือ</h3>
            <ul class="space-y-2.5">
              <li v-for="support in supportItems" :key="support.label">
                <ULink :to="support.to"
                  class="inline-flex items-center gap-2 text-xl text-slate-600 hover:text-sky-700">
                  <UIcon :name="support.icon" class="size-4 text-slate-400" />
                  <span>{{ support.label }}</span>
                </ULink>
              </li>
            </ul>
          </UCard>
        </aside>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">

const newsStore = useNewsStore()

const config = useRuntimeConfig();

const baseURL = config.public;


const mainServices = [
  {
    title: 'จ่ายเงินเดือน',
    description: 'บริการจัดการเงินเดือน',
    to: baseURL.payrollURL,
    icon: 'i-lucide-users-round'
  },
  {
    title: 'เครดิต',
    description: 'บริการจัดการเครดิต',
    to: baseURL.nexumURL,
    icon: 'i-lucide-wallet-cards'
  }
]

const quickActions = [
  {
    title: 'เติมเงินเข้าร้าน',
    description: 'เพื่อจ่ายเงินเดือน',
    to: baseURL.topupPayrollURL,
    icon: 'i-lucide-store'
  },
  {
    title: 'เติมเงินกระเป๋าเครดิต',
    description: 'เพื่อปล่อยเครดิต',
    to: baseURL.topupAllowanceURL,
    icon: 'i-lucide-pie-chart'
  }
]

const newsItems = computed(() => newsStore.data)

const supportItems = [
  {
    label: 'Coming Soon',
    to: '#',
    icon: 'i-lucide-message-circle-more'
  },
  {
    label: 'คู่มือการใช้งาน และคำถามที่พบบ่อย',
    to: 'https://docs.google.com/document/d/18M2T_NvFYvg4fn-lVixSzkp-24impC8EDtPxJHqOkpU/edit?tab=t.0',
    icon: 'i-lucide-message-circle-question-mark'
  }
  // {
  //   label: 'ติดต่อเจ้าหน้าที่ผ่าน Line OA',
  //   to: '#',
  //   icon: 'i-lucide-message-circle-more'
  // },
  // {
  //   label: 'support@nexum.com',
  //   to: 'mailto:support@nexum.com',
  //   icon: 'i-lucide-mail'
  // },
  // {
  //   label: '02-123-15789',
  //   to: 'tel:0212315789',
  //   icon: 'i-lucide-phone'
  // },
  // {
  //   label: 'มีบริการโฮม บิส และคำปรึกษาฟรี',
  //   to: '#',
  //   icon: 'i-lucide-circle-help'
  // }
]

useSeoMeta({
  title: 'Nexum Services',
  description: 'หน้าบริการสำหรับจัดการเงินเดือน เครดิต และศูนย์ช่วยเหลือ'
})

function openLink(url?: string) {
  if (!url || url === '#') {
    return
  }

  navigateTo(url, { external: true })
}
</script>

<style scoped>
.todsob-shell {
  background:
    linear-gradient(120deg, rgb(250 252 255 / 100%) 0%, rgb(244 248 254 / 100%) 55%, rgb(240 245 253 / 100%) 100%),
    radial-gradient(circle at 100% 0%, rgb(176 201 231 / 35%) 0%, transparent 42%);
  box-shadow: 0 24px 56px rgb(15 53 90 / 12%);
}

.todsob-service-card {
  background: linear-gradient(135deg, #00598A 55%, #CAD5E2 150%);
  position: relative;
  overflow: hidden;
}

.todsob-service-card::before,
.todsob-service-card::after {
  content: '';
  position: absolute;
  inset: auto;
  pointer-events: none;
}

/* top: -34%; */
/* right: -16%; */
.todsob-service-card::before {
  top: 0%;
  right: 0%;
  width: 100%;
  height: 100%;
  background: url('https://failfast.blob.core.windows.net/mcontent-imgs/landingnexum/bgnexum2.svg') no-repeat center center;
  background-size: cover;
}

/* background: linear-gradient(180deg, rgb(255 255 255 / 16%), rgb(255 255 255 / 0%)); */
/* transform: rotate(30deg); */

.todsob-service-card::after {
  width: 100%;
  height: 100%;
}

/* bottom: -38%; */
/* left: -30%; */
/* border-radius: 9999px; */
/* background: radial-gradient(circle, rgb(255 255 255 / 22%) 0%, rgb(255 255 255 / 0%) 66%); */
</style>
