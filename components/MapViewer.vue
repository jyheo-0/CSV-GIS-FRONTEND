<template>
  <ClientOnly>
    <div class="map-container">
      <!-- 지도 들어갈 곳 -->
      <div id="MapContainer"></div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('🔥 onMounted 실행됨')

  const existingScript = document.querySelector('script[src="/js/XDWorldEM.js"]')
  if (existingScript) {
    console.log('⚠️ XDWorldEM.js 이미 로드됨 — 중복 방지')
    return
  }

  const engineScript = document.createElement('script')
  engineScript.src = '/js/XDWorldEM.js'
  engineScript.async = true
  engineScript.onload = () => {
    console.log('✅ XDWorldEM.js 로딩 완료')

    const initScript = document.createElement('script')
    initScript.src = '/js/init.js'
    initScript.onload = () => {
      console.log('📦 init.js 수동 로딩 완료')
    }
    initScript.onerror = () => {
      console.error('❌ init.js 로딩 실패')
    }
    document.body.appendChild(initScript)
  }

  engineScript.onerror = () => {
    console.error('❌ XDWorldEM.js 로딩 실패')
  }

  document.body.appendChild(engineScript)
})
</script>

<style scoped>
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
}

#MapContainer {
  width: 100%;
  height: 100%;
}
</style>
