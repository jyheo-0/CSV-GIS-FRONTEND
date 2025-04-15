<template>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="layer in layers"
      :key="layer.id"
      elevation="1"
      class="layer-panel"
    >
      <v-expansion-panel-title class="d-flex justify-space-between align-center">
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
        <v-chip size="small" color="primary" variant="tonal" class="ml-2">
          {{ layer.geometryType.toUpperCase() }}
        </v-chip>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="pt-1">
        <v-expansion-panels multiple class="sub-settings">

          <!-- 포인트 설정 -->
          <v-expansion-panel v-if="layer.geometryType === 'point'">
            <v-expansion-panel-title>포인트 설정</v-expansion-panel-title>
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
            <v-expansion-panel-title>라벨 설정</v-expansion-panel-title>
            <v-expansion-panel-text class="px-0 py-0">
              <LabelSettings
                :layer="layer"
                :columns="columns"
                @update-label-column="layer.labelColumn = $event"
                @update-label-size="layer.labelSize = $event"
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

<script setup>
import { ref } from 'vue'
import PointSettings from './geometry/PointSettings.vue'
import LineSettings from './geometry/LineSettings.vue'
import PolygonSettings from './geometry/PolygonSettings.vue'
import LabelSettings from './LabelSettings.vue'
import LocationSettings from './LocationSettings.vue'

const columns = ['위도', '경도', '정류장명', '설치년도']

const layers = ref([
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
    labelSize: '14px'
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
</style>
