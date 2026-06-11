<template>
  <section class="px-4 py-5 lg:px-16 lg:py-16">
    <UBreadcrumb :items="breadcrumbs" class="mb-2"
      :ui="{ link: 'text-sky-700 text-base', separatorIcon: 'text-sky-300' }" />

    <h1 class="mb-4 text-5xl font-bold text-slate-900">ข่าวสาร</h1>

    <UCard :ui="{
      root: 'rounded-[26px] border-0 bg-white/90 shadow-sm',
      body: 'p-5 lg:p-8'
    }">
      <div class="mb-5 flex flex-wrap items-center gap-3 lg:justify-between">
        <div class="flex flex-wrap items-center gap-3">
          <UInput v-model="search" placeholder="ค้นหา" icon="i-lucide-search" size="xl" class="w-[320px] max-w-full" />

          <USelect v-model="selectedStatus" :items="statusOptions" placeholder="กรอง" icon="i-lucide-filter" size="xl"
            class="w-[320px] max-w-full" />
        </div>

        <UButton color="primary" variant="link" icon="i-lucide-plus-circle" label="เพิ่มข่าวสาร" class="text-sky-700"
          @click="isCreateOpen = true" />
      </div>

      <div class="space-y-5">
        <UCard v-for="item in pagedNews" :key="item.id"
          :ui="{ root: 'border-0 shadow-none bg-transparent', body: 'p-0' }"
          class="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
          <div class="mb-1 flex items-start gap-3">
            <h2 class="text-4xl font-medium leading-tight text-slate-900">{{ item.title }}</h2>
            <UBadge :label="item.statusText" :color="item.badgeColor" variant="soft" class="rounded-full text-sm" />
          </div>

          <p class="text-base text-slate-500">{{ item.description }}</p>
          <p class="mt-1 text-sm text-slate-400">{{ item.date }}</p>
        </UCard>
      </div>

      <div class="mt-6 flex justify-center">
        <UPagination v-model:page="page" :items-per-page="itemsPerPage" :total="filteredNews.length" show-controls
          show-edges :ui="{ root: 'justify-center', list: 'gap-2' }" />
      </div>
    </UCard>

    <USlideover :dismissible="false" v-model:open="isCreateOpen" title="เพิ่มข่าวสาร" close-icon="i-lucide-x" :ui="{
      content: 'max-w-[620px]',
      title: 'text-3xl font-bold text-slate-900 ',
      body: 'px-6 pb-4 ',
      header: 'px-6 pt-6 pb-2 justify-center',
      footer: 'px-6 pb-6'
    }">
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-xl font-medium text-slate-900">ประเภท</label>
            <USelect v-model="createForm.status" :items="createStatusOptions" placeholder="อัพเดท" size="xl"
              class="w-full" />
          </div>

          <div>
            <label class="mb-2 block text-xl font-medium text-slate-900">หัวข้อ</label>
            <UInput v-model="createForm.title" placeholder="Dashboard ใหม่" size="xl" class="w-full" />
          </div>

          <div>
            <label class="mb-2 block text-xl font-medium text-slate-900">เนื้อหา</label>
            <UTextarea v-model="createForm.description" :rows="6" placeholder="มีอัพเดทหรือข่าวสารใหม่" size="xl"
              class="w-full" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3">
          <UButton label="เผยแพร่" color="primary" class="flex-1 justify-center" @click="publishNews" />
          <UButton label="ยกเลิก" color="neutral" variant="soft" class="flex-1 justify-center"
            @click="isCreateOpen = false" />
        </div>
      </template>
    </USlideover>
  </section>
</template>

<script setup lang="ts">
type NewsStatus = 'all' | 'update' | 'announcement'
type CreateStatus = Exclude<NewsStatus, 'all'>

const newsStore = useNewsStore()

const breadcrumbs = [
  {
    label: 'กลับหน้าหลัก',
    to: '/todsob'
  }
]

const statusOptions = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'อัพเดต', value: 'update' },
  { label: 'ประกาศ', value: 'announcement' }
]

const createStatusOptions = [
  { label: 'อัพเดต', value: 'update' },
  { label: 'ประกาศ', value: 'announcement' }
]

const search = ref('')
const selectedStatus = ref<NewsStatus>('all')
const page = ref(1)
const itemsPerPage = 10
const isCreateOpen = ref(false)

const createForm = reactive({
  status: 'update' as CreateStatus,
  title: '',
  description: ''
})

function resetCreateForm() {
  createForm.status = 'update'
  createForm.title = ''
  createForm.description = ''
}

function publishNews() {
  const title = createForm.title.trim()
  const description = createForm.description.trim()

  if (!title || !description) {
    return
  }

  newsStore.addNews({
    title,
    description,
    status: createForm.status
  })

  page.value = 1
  isCreateOpen.value = false
  resetCreateForm()
}

const filteredNews = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return newsStore.data.filter((item) => {
    const matchedStatus = selectedStatus.value === 'all' || item.status === selectedStatus.value
    const matchedKeyword = !keyword || [item.title, item.description, item.statusText].join(' ').toLowerCase().includes(keyword)

    return matchedStatus && matchedKeyword
  })
})

const pagedNews = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return filteredNews.value.slice(start, start + itemsPerPage)
})

watch([search, selectedStatus], () => {
  page.value = 1
})

useSeoMeta({
  title: 'ข่าวสาร',
  description: 'ข่าวสารและประกาศจาก Nexum'
})
</script>