<template>
  <div class="d-flex" style="height: 100vh;">
    <!-- LeftNav 고정 -->
    <div class="left-nav">
      <LeftNav
        :active="layerPanelOpen"
        @toggleLayer="layerPanelOpen = !layerPanelOpen"
      />
    </div>

    <!-- Sidebar - toggle 방식 / LeftNav 다음에 붙어서 나와야 하므로 absolute X, margin-left 적용 -->
    <v-navigation-drawer
      v-model="layerPanelOpen"
      app
      temporary
      location="left"
      width="320"
      class="sidebar-panel"
    >
          <Sidebar />
    </v-navigation-drawer>

    <!-- MapViewer가 LeftNav 옆부터 차지하도록 -->
    <div class="flex-grow-1 position-relative" style="margin-left: 56px; min-height: 100vh;">
      <MapViewer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LeftNav from '@/components/LeftNav.vue'
import Sidebar from '@/components/Sidebar.vue'
import MapViewer from '@/components/MapViewer.vue'

const layerPanelOpen = ref(false)
</script>

<style scoped>
.left-nav {
  width: 56px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
}
.sidebar-panel {
  pointer-events: auto !important; /* ← 클릭 무시되는 현상 방지 */
  z-index: 1001;
  margin-left: 56px;
}

</style>