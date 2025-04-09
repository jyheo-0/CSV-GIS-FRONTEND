<template>
    <div class="map-page">
      <!-- 컨트롤 박스 -->
      <div class="map-controls">
        <v-card class="control-panel" flat>
          <v-card-title class="text-h6">position</v-card-title>
          <v-card-text>
            <v-btn-group class="mb-2" divided>
              <v-btn size="small" color="primary" variant="outlined">수직선</v-btn>
              <v-btn size="small" color="primary" variant="outlined">실린더</v-btn>
              <v-btn size="small" color="primary" variant="outlined">원</v-btn>
              <v-btn size="small" color="primary" variant="outlined">구</v-btn>
              <v-btn size="small" color="primary" variant="outlined">심볼</v-btn>
              <v-btn size="small" color="primary" variant="outlined">점</v-btn>
            </v-btn-group>
  
            <v-slider label="X" min="0" max="100" class="mt-2"></v-slider>
            <v-slider label="Y" min="0" max="100"></v-slider>
            <v-slider label="Z" min="0" max="100"></v-slider>
  
            <v-checkbox label="line" class="mt-2" />
            <v-divider class="my-2" />
            <v-checkbox label="polygon" />
            <v-checkbox label="grid" />
            <v-checkbox label="box" />
  
            <v-btn block color="error" variant="text" class="mt-4">clear</v-btn>
          </v-card-text>
        </v-card>
      </div>
  
      <!-- 지도 -->
      <div class="map-container">
        <!-- 실제 3D 지도 iframe or WebGL viewer -->
        <iframe
          src="http://192.168.1.108/Statistics/"
          class="map-frame"
          frameborder="0"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  // 추후 props, CSV 데이터, API 연동 등 붙일 수 있음
  </script>
  
  <style scoped>
  .map-page {
    height: 100vh;
    width: 100vw;
    position: relative;
    background-color: #0e1518;
  }
  
  /* 컨트롤 박스 */
  .map-controls {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    width: 320px;
    
  }
  
  .control-panel {
    background-color: rgba(42, 47, 54, 0.95);
    color: #DAE9F4;
    border-radius: 12px;
    padding: 12px;
  }
  
  /* 지도 영역 */
  .map-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .map-frame {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  