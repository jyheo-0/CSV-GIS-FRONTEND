<template>
  <div>
    <!-- 프리셋 컬러 -->
    <div class="d-flex flex-wrap gap-2 mb-2">
      <div
        v-for="color in presetColors"
        :key="color"
        :style="{ backgroundColor: color }"
        class="color-circle"
        :class="{ selected: color === localColor }"
        @click="selectColor(color)"
      />
    </div>

    <!-- 고급 설정 체크박스 -->
    <v-checkbox
      v-model="advancedEnabled"
      label="색상 팔레트"
      class="mt-1 no-details"
      hide-details
    />

    <!-- 색상 팔레트 -->
    <v-expand-transition>
      <div v-show="advancedEnabled" class="mt-2 color-picker-wrapper">
        <v-color-picker
          v-model="localColor"
          @update:model-value="selectColor"
          flat
          :hide-inputs="false"
          :hide-mode-switch="false"
          class="w-100"
        />
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { presetColors } from '@/constants/presetColors'

const props = defineProps<{
  color: string
}>()

const emit = defineEmits<{
  (e: 'update-color', value: string): void
}>()

const localColor = ref(props.color ?? '#ff6b6b')
const advancedEnabled = ref(false)

function selectColor(color: string) {
  localColor.value = color
  emit('update-color', color)
}

// props가 바뀌면 localColor도 동기화
watch(() => props.color, (val) => {
  localColor.value = val ?? '#ff6b6b'
})
</script>

<style scoped>
.color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  margin-right: 4px;
}
.color-circle.selected {
  border-color: #2196f3;
}

.color-picker-wrapper {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

.color-picker-wrapper :deep(.v-color-picker) {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box;
  padding: 0;
}
.no-details .v-input__details {
  display: none !important;
}
</style>