<template>
    <v-card width="320" height="100%" class="pa-4 d-flex flex-column" color="#1e1e1e" dark>
      <h2 class="text-h6 font-weight-bold mb-4">🛰 지도 설정</h2>
  
      <!-- 레이어 정보 -->
      <div class="mb-4">
        <p class="text-caption text-grey-lighten-1">레이어명</p>
        <p class="text-body-1 font-weight-medium">sample_layer.csv</p>
      </div>
  
      <!-- 좌표 필드 -->
      <div class="mb-4">
        <p class="text-caption text-grey-lighten-1 mb-1">좌표 필드 선택</p>
        <v-select
          label="위도 필드"
          :items="fields"
          v-model="latField"
          density="compact"
          variant="outlined"
          class="mb-2"
        />
        <v-select
          label="경도 필드"
          :items="fields"
          v-model="lngField"
          density="compact"
          variant="outlined"
        />
      </div>
  
      <!-- 마커 스타일 -->
      <div class="mb-4">
        <p class="text-caption text-grey-lighten-1 mb-1">마커 스타일</p>
        <v-select
          :items="['포인트', '아이콘', '클러스터']"
          v-model="markerType"
          label="타입"
          density="compact"
          variant="outlined"
          class="mb-2"
        />
        <v-color-picker
          v-model="markerColor"
          flat
          hide-inputs
          hide-canvas
          class="border"
          style="border-color: #555; border-width: 1px; border-style: solid;"
        />
      </div>
  
      <!-- 클러스터 -->
      <v-switch
        v-model="clusterEnabled"
        label="클러스터 활성화"
        density="compact"
        class="mb-4"
      />
  
      <!-- 반영 버튼 -->
      <v-btn color="primary" block>지도에 반영</v-btn>
    </v-card>
  </template>
  
  <script setup>
  const fields = ['위도', '경도', '이름', '주소']
  const latField = ref('위도')
  const lngField = ref('경도')
  const markerType = ref('포인트')
  const markerColor = ref('#ff0000')
  const clusterEnabled = ref(true)
  </script>
  