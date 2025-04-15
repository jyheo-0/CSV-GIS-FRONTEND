<template>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="layer in layers"
      :key="layer.id"
      elevation="1"
      class="layer-panel"
    >
      <!-- ✅ 상위: 칩 오른쪽 끝 정렬되도록 감싸줌 -->
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
            {{ layer.name }}
          </div>
          <v-chip size="small" color="primary" variant="tonal">
            {{ layer.geometryType.toUpperCase() }}
          </v-chip>
        </div>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="pt-1">
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
                <span class="marker-size">{{ layer.size }}px</span>
                <div class="marker-color" :style="{ backgroundColor: layer.baseColor }" />
              </div>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="px-0 py-0">
              <PointSettings
                :layer="layer"
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LabelSettings from './LabelSettings.vue'
import LocationSettings from './LocationSettings.vue'
import PointSettings from './geometry/PointSettings.vue'
import LineSettings from './geometry/LineSettings.vue'
import PolygonSettings from './geometry/PolygonSettings.vue'
import { geometryOptions } from '@/constants/geometryOptions'

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
</style>
