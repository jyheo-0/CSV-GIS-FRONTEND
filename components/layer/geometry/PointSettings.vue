<template>
  <div>
    <!-- 마커 타입 -->
    <div class="mb-6">
      <h4 class="mb-2">마커 타입</h4>
      <v-container class="pa-0">
        <v-row dense>
          <v-col
            v-for="(item, index) in geometryOptions"
            :key="index"
            cols="4"
          >
            <v-card
              class="icon-thumb"
              :class="{ selected: layer.markerType === item.value }"
              @click="updateType(item)"
            >
              <img
                :src="`/makers/${item.value}.svg`"
                alt="icon"
                width="30"
                height="30"
              />
              <div class="label">{{ item.label }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- 마커 크기 -->
<!-- 마커 크기 -->
<div class="mb-6">
  <h4 class="mb-2 text-sm">마커 크기</h4>

  <v-slider
    v-model="localSize"
    :min="1"
    :max="99"
    :step="1"
    hide-details
    @update:model-value="emit('update-size', localSize)"
  >
    <template #append>
      <v-text-field
        v-model="localSize"
        @update:model-value="emit('update-size', localSize)"
        density="compact"
        style="width: 70px"
        type="number"
        hide-details
        single-line
      />
    </template>
  </v-slider>

  <!-- 고급 설정 체크 -->
  <v-checkbox
    v-model="advancedEnabled"
    label="고급 크기 설정 (X/Y/Z)"
    hide-details
  />

  <!-- 고급 설정 슬라이더 -->
  <v-expand-transition>
    <div v-show="advancedEnabled">
      <v-slider v-model="layer.scaleX" label="X" :min="1" :max="99" :step="1" >
        <template #append>
          <v-text-field
            v-model="layer.scaleX"
            maxlength="3"
            type="number"
            density="compact"
            hide-details
            single-line
            style="width: 70px"
          />
        </template>
      </v-slider>

      <v-slider v-model="layer.scaleY" label="Y" :min="1" :max="99" :step="1">
        <template #append>
          <v-text-field
            v-model="layer.scaleY"
            type="number"
            density="compact"
            hide-details
            single-line
            style="width: 70px"
          />
        </template>
      </v-slider>

      <v-slider v-model="layer.scaleZ" label="Z" :min="1" :max="99" :step="1">
        <template #append>
          <v-text-field
            v-model="layer.scaleZ"
            type="number"
            density="compact"
            hide-details
            single-line
            style="width: 70px"
          />
        </template>
      </v-slider>
    </div>
  </v-expand-transition>
</div>


    <!-- 마커 색상 -->
<!-- 마커 색상 -->
<div class="mb-6">
  <h4 class="mb-2">마커 색상</h4>

  <!-- 프리셋 컬러 -->
  <div class="d-flex flex-wrap gap-2 mb-2">
    <div
      v-for="color in presetColors"
      :key="color"
      :style="{ backgroundColor: color }"
      class="color-circle"
      :class="{ selected: color === localColor }"
      @click="updateColor(color)"
    />
  </div>

  <!-- 고급 설정 체크박스 -->
  <v-checkbox
    v-model="advancedColorEnabled"
    label="색상 팔레트"
    class="mt-1 no-details"
  />

  <!-- 고급 설정 (v-color-picker 전체 표시) -->
  <v-expand-transition>
    <div v-show="advancedColorEnabled" class="mt-2 color-picker-wrapper">
      <v-color-picker
        v-model:model-value="localColor"
        @update:model-value="updateColor"
        flat
        hide-inputs="false"
        hide-mode-switch="false"
        class="w-100"
      />
    </div>
  </v-expand-transition>
</div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  layer: Object,
  presetColors: Array,
})
const emit = defineEmits(['update-type', 'update-size', 'update-color'])

const geometryOptions = [
  { value: 'none', label: '선택 안함' },
  { value: 'point', label: '점' },
  { value: 'circle', label: '원' },
  { value: 'vertical-line', label: '수직선' },
  { value: 'cylinder', label: '실린더' },
  { value: 'sphere', label: '구' },
  { value: 'cone', label: '콘' },
  { value: 'symbol', label: '심볼' },
  { value: 'icon', label: '아이콘' }
]

const localSize = ref(props.layer.size ?? 50)
const localColor = ref(props.layer.baseColor ?? '#ff6b6b')

const presetColors = [
'#ff6b6b', '#ffa94d', '#ffd43b',
'#38b000', '#3bc9db', '#4c6ef5',
'#845ef7', '#FFFFFF', '#000000'
]

const advancedEnabled = ref(false)
const advancedColorEnabled = ref(false)


watch(() => props.layer.size, val => localSize.value = val)
watch(() => props.layer.baseColor, val => localColor.value = val)

function updateType(item) {
  emit('update-type', item.value)
}
function updateColor(color) {
  localColor.value = color
  emit('update-color', color)
}

const { layer } = props

// 고급 크기 설정 on 시, size → XYZ 복사
watch(advancedEnabled, (val) => {
  if (val) {
    layer.scaleX = layer.size ?? 50
    layer.scaleY = layer.size ?? 50
    layer.scaleZ = layer.size ?? 50
  }
})

// 기본 크기 바뀌면 고급 크기도 갱신
watch(() => layer.size, (newSize) => {
  if (advancedEnabled.value) {
    layer.scaleX = newSize
    layer.scaleY = newSize
    layer.scaleZ = newSize
  }
})

// 색상 반영 (프리셋 자동 반영 보장)
watchEffect(() => {
  if (!layer.baseColor) {
    layer.baseColor = '#ff6b6b'
  }
})

</script>

<style scoped>
.icon-thumb {
  width: 100%;
  height: 70px;
  background-color: #1e1e1e;
  color: white;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.icon-thumb.selected {
  border: 2px solid #2196f3;
  background-color: #263238;
}
.icon-thumb .label {
  margin-top: 2px;
  font-size: 12px;
  color: #ccc;
}

.color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  margin-left: 4px;
  cursor: pointer;
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
