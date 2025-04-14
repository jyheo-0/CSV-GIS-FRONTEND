<template>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="layer in layers"
      :key="layer.id"
      elevation="1"
      class="layer-panel"
    >
      <v-expansion-panel-title>
        <v-icon
          class="mr-2"
          style="cursor: pointer"
          @click.stop="layer.visible = !layer.visible"
          :icon="layer.visible ? 'mdi-eye' : 'mdi-eye-off'"
          :color="layer.visible ? 'light-grey' : 'grey'"
        />
        {{ layer.name }}
      </v-expansion-panel-title>

      <v-expansion-panel-text class="pt-1">
        <v-expansion-panels multiple class="sub-settings">
          <v-expansion-panel>
            <v-expansion-panel-title>마커 설정</v-expansion-panel-title>
            <v-expansion-panel-text class="px-0 py-0">
              <MarkerSettings
                :layer="layer"
                @update-type="layer.type = $event"
                @update-size="layer.size = $event"
                @update-color="layer.baseColor = $event"
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
import MarkerSettings from './MarkerSettings.vue' // ✅ 마커 설정 컴포넌트 import

const layers = ref([
  {
    id: 1,
    name: 'bus.csv',
    visible: true,
    type: 'point',
    baseColor: '#00ff00',
    size: 20,
  },
  {
    id: 2,
    name: 'school.csv',
    visible: false,
    type: 'line',
    baseColor: '#ff0000',
    size: 10,
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
