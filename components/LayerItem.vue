<template>
  <v-expansion-panels variant="accordion" class="mb-2">
    <v-expansion-panel elevation="1">
      <v-expansion-panel-title class="custom-title">
        <v-icon
          class="mr-2"
          style="cursor: pointer"
          @click.stop="layer.visible = !layer.visible"
          :icon="layer.visible ? 'mdi-eye' : 'mdi-eye-off'"
          :color="layer.visible ? 'light-grey' : 'grey'"
        />
        {{ layer.name }}
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <MarkerTypeSelector :value="layer.type" @update="onUpdateType" />
        <MarkerSizeControl :layer="layer" />
        <MarkerColorPicker v-model:color="layer.baseColor" :presetColors="presetColors" />
        <MarkerLabelSettings
          v-model:labelField="labelField"
          v-model:labelPosition="labelPosition"
          v-model:labelSize="labelSize"
          v-model:labelAlwaysVisible="labelAlwaysVisible"
          v-model:labelColor="labelColor"
          :csvHeaders="csvHeaders"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, watch } from 'vue'
import MarkerTypeSelector from './MarkerTypeSelector.vue'
import MarkerSizeControl from './MarkerSizeControl.vue'
import MarkerColorPicker from './MarkerColorPicker.vue'
import MarkerLabelSettings from './MarkerLabelSettings.vue'

const props = defineProps({
  layer: Object
})
const emit = defineEmits(['update'])

const menuOpen = ref(false)

const presetColors = [
  '#ff6b6b', '#ffa94d', '#ffd43b', '#38b000',
  '#3bc9db', '#4c6ef5', '#845ef7', '#ffffff', '#000000'
]

// 예시 CSV 헤더 (실제로는 props 등으로 받아올 수 있음)
const csvHeaders = ['이름', '주소', '설치년도', '관리번호']

const labelField = ref('이름')
const labelPosition = ref('top')
const labelSize = ref(14)
const labelAlwaysVisible = ref(true)
const labelColor = ref('#333333')

function onUpdateType(type) {
  emit('update', { id: props.layer.id, type })
}
</script>

<style scoped>
.custom-title {
  background-color: #2c2c2c;
}
::v-deep(.v-expansion-panel-text__wrapper) {
  padding: 12px 0 !important;
}
</style>
