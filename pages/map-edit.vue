<template>
  <div class="d-flex flex-row" style="height: 100vh;">
    <KeplerSidebar />
    <div class="d-flex flex-column flex-grow-1" style="min-width: 0;">
      <MapViewer />
    </div>
  </div>
</template>

<script setup>
import KeplerSidebar from '~/components/Sidebar.vue'
import MapViewer from '~/components/MapViewer.vue'
</script>
