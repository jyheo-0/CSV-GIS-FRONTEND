<template>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="layer in layers"
      :key="layer.id"
      elevation="1"
      class="layer-panel"
    >
      <v-expansion-panel-title>
        <div class="d-flex justify-space-between align-center w-100">
          <div class="d-flex align-center">
            <v-icon
              class="mr-2"
              style="cursor: pointer"
              @click.stop="layer.visible = !layer.visible"
              :icon="layer.visible ? 'mdi-eye' : 'mdi-eye-off'"
              :color="layer.visible ? 'light-grey' : 'grey'"
            />
              <EditableTitle :name="layer.name" @rename="layer.name = $event" />
          </div>
          <v-chip size="small" color="primary" variant="tonal">
            {{ layer.geometryType.toUpperCase() }}
          </v-chip>
        </div>
      </v-expansion-panel-title>

        <v-expansion-panel-text class="pt-1">
          <v-col cols="auto" v-if="['약국', '소화전', '음식점'].includes(layer.name)">
            <v-btn
              size="x-small"
              variant="outlined"
              class="mr-1"
              @click="parseLayer(getTypeFromName(layer.name))"
            >
              CSV Parse
            </v-btn>
            <div class="d-flex align-center mb-2">
              <v-chip size="small" color="blue">
                진행률: <span id="prograss_1">0%</span>
              </v-chip>
              <v-chip size="small" color="green" class="ml-2">
                소요시간: <span id="timer_1">0초</span>
              </v-chip>
            </div>

          </v-col>




        <!-- 🧩 레이어 속성 기능 버튼들 -->
        <v-row dense class="justify-center align-center">
          <v-col cols="auto">
            <v-btn
              icon
              size="x-small"
              variant="text"
              class="hover-info"
              @click="handlePreview(layer.id)"
            >
              <v-icon size="18">mdi-table-eye</v-icon>
              <v-tooltip activator="parent" location="bottom">csv 미리보기</v-tooltip>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              icon
              size="x-small"
              variant="text"
              class="hover-success"
              @click="handleExport(layer.id)"
            >
              <v-icon size="18">mdi-export-variant</v-icon>
              <v-tooltip activator="parent" location="bottom">내보내기</v-tooltip>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              icon
              size="x-small"
              variant="text"
              class="hover-error"
              @click="handleDelete(layer.id)"
            >
              <v-icon size="18">mdi-delete</v-icon>
              <v-tooltip activator="parent" location="bottom">레이어 삭제</v-tooltip>
            </v-btn>
          </v-col>
        </v-row>




        <v-expansion-panels multiple class="sub-settings">


          <!-- 포인트 설정 -->
          <v-expansion-panel v-if="layer.geometryType === 'point'">
            <v-expansion-panel-title class="d-flex align-center">
              <div class="d-flex align-center">포인트 설정</div>
              <div class="point-summary ml-auto">
                <img
                  :src="`/markers/${layer.markerType}.svg`"
                  :alt="layer.markerType"
                  class="marker-icon"
                />
                <div class="marker-color" :style="{ backgroundColor: layer.baseColor }" />
                <span class="marker-size">{{ layer.size }}px</span>
              </div>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="px-0 py-0">
              <PointSettings
                :layer="layer"
                v-model:selectedShape="selectedShape"
                @update-type="layer.markerType = $event"
                @update-size="layer.size = $event"
                @update-color="layer.baseColor = $event"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- 라인 설정 -->
          <v-expansion-panel v-if="layer.geometryType === 'line'">
            <v-expansion-panel-title>라인 설정</v-expansion-panel-title>
            <v-expansion-panel-text class="px-0 py-0">
              <LineSettings
                :layer="layer"
                @update-line-width="layer.lineWidth = $event"
                @update-color="layer.strokeColor = $event"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- 폴리곤 설정 -->
          <v-expansion-panel v-if="layer.geometryType === 'polygon'">
            <v-expansion-panel-title>폴리곤 설정</v-expansion-panel-title>
            <v-expansion-panel-text class="px-0 py-0">
              <PolygonSettings
                :layer="layer"
                @update-fill-color="layer.fillColor = $event"
                @update-filled="layer.filled = $event"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- 라벨 설정 -->
          <v-expansion-panel>
            <v-expansion-panel-title class="d-flex align-center">
              <div>라벨 설정</div>
              <div class="label-summary ml-auto">
                <span
                  class="label-preview-text"
                  :style="layer.labelColumn ? {
                    color: layer.labelColor ?? '#000000',
                    WebkitTextStroke: `1px ${layer.labelStrokeColor ?? '#ffffff'}`
                  } : {}"
                >
                  {{ layer.labelColumn ? layer.labelColumn : '사용 안 함' }}
                </span>
                <span class="label-size" v-if="layer.labelColumn">
                  {{ formatLabelSize(layer.labelSize) }}
                </span>
              </div>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="px-0 py-0">
              <LabelSettings
                :layer="layer"
                :columns="columns"
                @update-label-column="layer.labelColumn = $event"
                @update-label-size="layer.labelSize = $event"
                @update-label-color="layer.labelColor = $event"
                @update-label-stroke-color="layer.labelStrokeColor = $event"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- 위치 설정 -->
          <v-expansion-panel>
            <v-expansion-panel-title>위치 설정</v-expansion-panel-title>
            <v-expansion-panel-text class="px-0 py-0">
              <LocationSettings
                :layer="layer"
                :columns="columns"
                @update-lat-column="layer.latColumn = $event"
                @update-lng-column="layer.lngColumn = $event"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <DataPreviewDialog
  v-if="previewLayer"
  v-model="previewDialog"
  :columns="previewLayer.columns"
  :preview-rows="previewLayer.data"
/>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LabelSettings from './LabelSettings.vue'
import EditableTitle from './EditableTitle.vue'
import LocationSettings from './LocationSettings.vue'
import PointSettings from './geometry/PointSettings.vue'
import LineSettings from './geometry/LineSettings.vue'
import PolygonSettings from './geometry/PolygonSettings.vue'
import { geometryOptions } from '@/constants/geometryOptions'
import DataPreviewDialog from './DataPreviewDialog.vue'

declare global {
  interface Window {
    setProgressCallback?: (percent: string) => void
    isXDWorldReady?: boolean
    parseLargeCSV?: (type: number) => void
    loadPositionData?: (shapeType: string) => void
    removeAllMarkers?: () => void
  }
}



interface Layer {
  id: number
  name: string
  visible: boolean
  geometryType: 'point' | 'line' | 'polygon'
  markerType?: string
  size?: number
  baseColor?: string
  scaleX?: number
  scaleY?: number
  scaleZ?: number
  strokeColor?: string
  lineWidth?: number
  fillColor?: string
  filled?: boolean
  latColumn?: string
  lngColumn?: string
  labelColumn?: string | null
  labelSize?: string | number
  labelColor?: string
  labelStrokeColor?: string
}

const columns = ['위도', '경도', '정류장명', '설치년도']

const layers = ref<Layer[]>([
  {
    id: 1,
    name: 'bus_stop.csv',
    visible: true,
    geometryType: 'point',
    markerType: 'point',
    size: 30,
    baseColor: '#ff6b6b',
    latColumn: '위도',
    lngColumn: '경도',
    labelColumn: '정류장명',
    labelSize: '14'
  },
  {
    id: 2,
    name: 'bus_route.csv',
    visible: true,
    geometryType: 'line',
    strokeColor: '#3498db',
    lineWidth: 2
  },
  {
    id: 3,
    name: 'school_zone.csv',
    visible: true,
    geometryType: 'polygon',
    fillColor: '#2ecc71',
    filled: true
  },

  // 🔽 여기부터 새로 추가한 포인트 레이어 3개
  {
    id: 4,
    name: '약국',
    visible: false,
    geometryType: 'point',
    markerType: 'none',
    size: 30,
    baseColor: '#4caf50',
    latColumn: '위도',
    lngColumn: '경도',
    labelColumn: '약국명',
    labelSize: '14'
  },
  {
    id: 5,
    name: '소화전',
    visible: false,
    geometryType: 'point',
    markerType: 'point',
    size: 30,
    baseColor: '#e53935',
    latColumn: '위도',
    lngColumn: '경도',
    labelColumn: '설치장소',
    labelSize: '14'
  },
  {
    id: 6,
    name: '음식점',
    visible: false,
    geometryType: 'point',
    markerType: 'point',
    size: 30,
    baseColor: '#ff9800',
    latColumn: '위도',
    lngColumn: '경도',
    labelColumn: '업소명',
    labelSize: '14'
  }
])

function getMarkerLabel(markerType: string) {
  const found = geometryOptions.find(item => item.value === markerType)
  return found ? found.label : '선택 안함'
}

function formatLabelSize(size: string | number | null | undefined): string {
  if (size == null) return ''
  const raw = typeof size === 'number' ? size : size.replace(/px$/, '')
  return `${raw}px`
}


function handleExport(id: number) {
  console.log(`내보내기: ${id}`)
  // 내보내기 처리 로직 연결
}

function handleDelete(id: number) {
  console.log(`삭제: ${id}`)
  // 삭제 처리 로직 연결
}



// 샘플 데이터 예시

const previewDialog = ref(false)
const previewLayer = ref<{ columns: string[]; data: any[] } | null>(null)

const parsingProgress = ref('0%')
const parsingTime = ref('0초')

function handlePreview(layerId: number) {
  const target = layers.value.find(l => l.id === layerId)
  if (!target) return
  // 테스트용 목데이터 (실제 CSV 파싱 데이터로 교체 필요)
  previewLayer.value = {
    columns: ['위도', '경도', '정류장명', '설치년도'],
    data: [
      { 위도: '37.123', 경도: '127.123', 정류장명: '버스정류장1', 설치년도: '2020' },
      { 위도: '37.456', 경도: '127.456', 정류장명: '버스정류장2', 설치년도: '2021' },
      { 위도: '37.789', 경도: '127.789', 정류장명: '버스정류장3', 설치년도: '2022' },
      { 위도: '37.888', 경도: '127.999', 정류장명: '버스정류장4', 설치년도: '2023' },
      { 위도: '37.999', 경도: '127.000', 정류장명: '버스정류장5', 설치년도: '2024' }
    ]
  }
  previewDialog.value = true
}


function getTypeFromName(name: string): number {
  if (name === '음식점') return 0
  if (name === '소화전') return 1
  if (name === '약국') return 2
  return -1
}

// ✅ 마커 가시화
function visualizeLayer(type: number, markerType: string = 'sphere') {
  if (!window.isXDWorldReady) {
    console.warn('🛑 아직 XDWorld 초기화되지 않음')
    return
  }

  console.log(`📦 CSV 파싱 실행: type=${type}`)
  window.parseLargeCSV?.(type)

  setTimeout(() => {
    console.log(`🧭 가시화 실행: shape=${markerType}`)
    window.loadPositionData?.(markerType)
  }, 1000)
}
const selectedShape = ref<string>('')

// ✅ 마커 형상 watch → 바로 반영 또는 제거
watch(selectedShape, (newVal) => {
  if (!window.isXDWorldReady) return
  if (!newVal) {
    console.log('🚫 마커 타입 없음 - 마커 제거')
    window.removeAllMarkers?.()
  } else {
    console.log('🧭 마커 타입 변경됨:', newVal)
    window.loadPositionData?.(newVal)
  }
})

// ✅ CSV 파싱만 (표시 X)
function parseLayer(type: number) {
  if (!window.isXDWorldReady) {
    console.warn('🛑 아직 XDWorld 초기화되지 않음')
    return
  }
  console.log(`📦 CSV 파싱 실행: type=${type}`)
  window.parseLargeCSV?.(type)
}

onMounted(() => {
  window.setProgressCallback = (percent: string) => {
    console.log('진행률:', percent)
  }
})


</script>

<style scoped>
.layer-panel.v-expansion-panel--active > .v-expansion-panel-title {
  background-color: #555353 !important;
}

.layer-panel :deep(.v-expansion-panel-title) {
  padding: 5px !important;
}

::v-deep(.v-expansion-panel-text__wrapper) {
  padding: 5px !important;
}

.sub-settings :deep(.v-expansion-panel-title) {
  font-weight: bold !important;
  font-size: 14px;
}

.point-summary {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-size: 12px;
  color: #ccc;
}
.marker-icon {
  width: 20px;
  height: 20px;
}

.marker-color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.marker-type {
  font-weight: 500;
  color: #ccc;
}

.marker-size {
  font-weight: 400;
  color: #aaa;
}

::v-deep(.v-expansion-panel-title__icon) {
  padding-left: 4px !important;
  padding-right: 4px !important;
  margin-left: 8px !important;
}

.label-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #ccc;
}
.label-column {
  font-weight: 500;
}
.label-size {
  font-weight: 400;
  color: #aaa;
}

.label-preview-text {
  font-weight: bold;
  font-size: 14px;
}

.hover-info:hover {
  color: #2196f3; 
}
.hover-success:hover {
  color: #4caf50;
}
.hover-error:hover {
  color: #f44336;
}
</style>
