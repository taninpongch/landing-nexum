<template>
  <UHeader :ui="headerUi" class="p-0">
    <template #left>
      <NuxtLink to="/todsob" aria-label="Nexum Home"
        class="relative flex min-h-8.5 items-center gap-2 overflow-hidden  px-3 pr-7 text-white no-underline">
        <!-- <UAvatar size="xl" src="https://failfast.blob.core.windows.net/mcontent-imgs/landingnexum/Vector.png"
          class="bg-[#f2f7fd]" /> -->
        <img src="https://failfast.blob.core.windows.net/mcontent-imgs/landingnexum/logonexum.png" alt="Nexum Logo"
          class="mx-auto" />
        <!-- <span class="text-xs font-semibold tracking-[0.04em]">NEXUM</span> -->
        <span
          class="pointer-events-none absolute -right-3 inset-y-0 w-7 bg-[linear-gradient(120deg,transparent_0%,transparent_26%,#0b5c8d_27%,#0b5c8d_52%,transparent_53%)]" />
      </NuxtLink>

        <!-- <span
          class="grid size-4.75 place-content-center rounded-full bg-[#1ac276] text-[10px] font-bold text-[#ecfff5]">FD</span> -->
        <!-- <UAvatar size="xl" src="https://failfast.blob.core.windows.net/mcontent-imgs/landingnexum/Vector.png"
          class="bg-[#f2f7fd]" /> -->
      <!-- <div class="flex min-h-8.5 items-center gap-1.75 border-r border-[#1f6b96] px-3 max-md:border-r-0">
        <img src="https://failfast.blob.core.windows.net/mcontent-imgs/landingnexum/Vector.png" alt="Nexum Logo"
          class="size-10" />
        <span class="text-xl font-semibold text-white max-md:hidden">Freedom credit company</span>
      </div> -->
    </template>

    <!-- <template #right>
      <div class="flex min-h-8.5 items-center gap-2  ">
        <span class="text-xl font-bold text-white max-md:hidden">Anon Bangsan</span>
        <UAvatar size="xl" icon="i-lucide-user" class="bg-[#89c8b1]" :ui="{ icon: 'size-3 text-sky-900' }" />
      </div>
    </template> -->
  </UHeader>
</template>

<script setup lang="ts">
const headerUi = {
  root: 'bg-[#024A70]',
  container: 'max-w-none min-h-9 px-0'
}
</script>
