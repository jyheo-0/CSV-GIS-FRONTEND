<template>
  <v-expansion-panels multiple>
    <LayerItem
      v-for="layer in layers"
      :key="layer.id"
      :layer="layer"
      @toggle="toggleLayer(layer)"
      @update="updateLayer"
    />
  </v-expansion-panels>
</template>

<script setup>
import { ref } from 'vue'
import LayerItem from './LayerItem.vue'

const layers = ref([
  {
    id: 1,
    name: 'bus.csv',
    visible: true,
    shape: 'point',
    colorField: 'Depth',
    baseColor: '#00ff00'
  },
  {
    id: 2,
    name: 'school.csv',
    visible: false,
    shape: 'line',
    colorField: 'Magnitude',
    baseColor: '#ff8800'
  }
])

function toggleLayer(layer) {
  layer.visible = !layer.visible
}

function updateLayer({ id, type }) {
  const layer = layers.value.find(l => l.id === id)
  if (layer) layer.shape = type
}
</script>
