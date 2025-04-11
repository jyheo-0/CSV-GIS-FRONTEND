<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: 'bg-[#121212] text-gray-100'
  }
})
</script>
