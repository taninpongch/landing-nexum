<template>
  <UFooter :ui="{
    container: 'max-w-none min-h-9 px-0',
    right: 'gap-x-0 flex-wrap'
  }">
    <!-- container: 'border-t border-default lg:py-8', -->
    <template #left>
      <p class="text-base text-[#90A1B9]">
        © 2026 Nexum Co., Ltd •
        <!-- © {{ new Date().getFullYear() }} -->
      </p>
    </template>

    <template #right>
      <UButton v-for="link in links" :key="link.label" :label="link.label" :to="link.to" variant="link"
        class="text-base text-[#90A1B9]" size="sm" />
    </template>
  </UFooter>
</template>


<script setup lang="ts">
const links = [
  { label: 'Privacy Policy', to: 'https://ui.nuxt.com', target: '_blank' },
  { label: 'Terms of Service', to: 'https://github.com/nuxt/ui', target: '_blank' },
  { label: 'Contact Us', to: 'https://twitter.com/nuxt_js', target: '_blank' },
]
</script>
