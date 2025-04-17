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
                :src="`/markers/${item.value}.svg`"
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
            :min="1"
            :max="99"
            hide-details
            single-line
            @blur="clampSize"
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
          <v-slider v-model="layer.scaleX" label="X" :min="1" :max="99" :step="1">
            <template #append>
              <v-text-field
                v-model="layer.scaleX"
                type="number"
                density="compact"
                hide-details
                single-line
                style="width: 70px"
                :min="1"
                :max="99"
                @blur="clampScale('X')"
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
                :min="1"
                :max="99"
                @blur="clampScale('Y')"
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
                :min="1"
                :max="99"
                @blur="clampScale('Z')"
              />
            </template>
          </v-slider>
        </div>
      </v-expand-transition>
    </div>

    <!-- 마커 색상 -->
    <div class="mb-6">
      <h4 class="mb-2">마커 색상</h4>
      <ColorSelector
        :color="localColor"
        @update-color="updateColor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { geometryOptions } from '@/constants/geometryOptions'
import ColorSelector from '@/components/ColorSelector.vue'

const props = defineProps<{
  layer: {
    size?: number
    scaleX?: number
    scaleY?: number
    scaleZ?: number
    baseColor?: string
    markerType?: string
    [key: string]: any
  }
  selectedShape: string
}>()
const emit = defineEmits([
  'update-type',
  'update-size',
  'update-color',
  'update:selectedShape'
])

const localSize = ref(props.layer.size ?? 50)
const localColor = ref(props.layer.baseColor ?? '#ff6b6b')
const advancedEnabled = ref(false)

const { layer } = props

function updateType(item: { value: string }) {
  emit('update-type', item.value)
  emit('update:selectedShape', item.value) // 💡 v-model:selectedShape과 연동되도록
}
function updateColor(color: string) {
  localColor.value = color
  emit('update-color', color)
}

function clampSize() {
  if (localSize.value < 1) localSize.value = 1
  if (localSize.value > 99) localSize.value = 99
  emit('update-size', localSize.value)
}

function clampScale(axis: 'X' | 'Y' | 'Z') {
  const key = `scale${axis}` as keyof typeof layer
  if (layer[key] === undefined) return
  if (layer[key]! < 1) layer[key] = 1
  if (layer[key]! > 99) layer[key] = 99
}

watch(() => props.layer.size, val => localSize.value = val ?? 50)
watch(() => props.layer.baseColor, val => localColor.value = val ?? '#ff6b6b')

watch(advancedEnabled, (val) => {
  if (val) {
    layer.scaleX = layer.size ?? 50
    layer.scaleY = layer.size ?? 50
    layer.scaleZ = layer.size ?? 50
  }
})

watch(() => layer.size, (newSize) => {
  if (advancedEnabled.value) {
    layer.scaleX = newSize
    layer.scaleY = newSize
    layer.scaleZ = newSize
  }
})

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
</style>