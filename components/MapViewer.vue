<template>
  <ClientOnly>
    <div class="map-container">
      <div id="MapContainer"></div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const parsingProgress = ref('0%')    // ✅ 퍼센트용
const parsingTime = ref('0초')       // ✅ 초용

onMounted(() => {
  console.log('🔥 onMounted 실행됨')

  // ✅ 전역 콜백 등록! (init.js에서 호출하게 될 함수)
  window.setProgressCallback = (percent, seconds) => {
    parsingProgress.value = percent
    parsingTime.value = seconds
  }

  // 0단계: proj4 먼저 로딩
  const proj4Script = document.createElement('script')
  proj4Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.7.5/proj4.js'
  proj4Script.onload = () => {
    console.log('✅ proj4 로딩 완료')

    // 1단계: XDWorld 엔진 로딩
    const engineScript = document.createElement('script')
    engineScript.src = '/js/XDWorldEM.js'
    engineScript.async = true
    engineScript.onload = () => {
      console.log('✅ XDWorldEM.js 로딩 완료')

      // 2단계: init.js 로딩
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
  }

  proj4Script.onerror = () => {
    console.error('❌ proj4 로딩 실패')
  }

  document.body.appendChild(proj4Script)
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
