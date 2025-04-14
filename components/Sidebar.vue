<template>
  <div class="sidebar-scroll-wrapper">
    <h3 class="text-subtitle-1 font-weight-bold mb-3">
      <v-icon class="mr-1">mdi-layers</v-icon>
      레이어 설정
    </h3>
    <LayerPanel />
  </div>
</template>

<script setup>
import LayerPanel from './LayerPanel.vue'
</script>

<style scoped>
.sidebar-scroll-wrapper {
  height: 100%;
  padding: 16px; /* 기존 pa-2 효과 대체 */
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
}
</style>