<template>
    <div class="px-4 py-2">
      <!-- Point 타입 설정 -->
      <PointSettings
        v-if="layer.type === 'point'"
        :layer="layer"
        @update-size="layer.size = $event"
        @update-color="layer.baseColor = $event"
      />
  
      <!-- Line 타입 설정 -->
      <LineSettings
        v-else-if="layer.type === 'line'"
        :layer="layer"
        @update-line-width="layer.lineWidth = $event"
        @update-color="layer.strokeColor = $event"
      />
  
      <!-- Polygon 타입 설정 -->
      <PolygonSettings
        v-else-if="layer.type === 'polygon'"
        :layer="layer"
        @update-fill-color="layer.fillColor = $event"
        @update-filled="layer.filled = $event"
      />
    </div>
  </template>
  
  <script setup>
  import PointSettings from './geometry/PointSettings.vue'
  import LineSettings from './geometry/LineSettings.vue'
  import PolygonSettings from './geometry/PolygonSettings.vue'
  
  defineProps({
    layer: {
      type: Object,
      required: true
    }
  })
  </script>
  