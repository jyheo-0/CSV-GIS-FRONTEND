<template>
  <div>
    <!-- 채우기 여부 -->
    <div class="mb-6">
      <v-switch
        v-model="localFilled"
        label="폴리곤 내부 채우기"
        hide-details
        @update:model-value="emit('update-filled', localFilled)"
      />
    </div>

    <!-- 채우기 색상 -->
    <div class="mb-6" v-if="localFilled">
      <h4 class="mb-2">채우기 색상</h4>
      <ColorSelector
        :color="localFillColor"
        @update-color="updateFillColor"
      />
    </div>

    <!-- 테두리 색상 -->
    <div class="mb-6">
      <h4 class="mb-2">테두리 색상</h4>
      <ColorSelector
        :color="localStrokeColor"
        @update-color="updateStrokeColor"
      />
    </div>

    <!-- 테두리 두께 -->
    <div class="mb-6">
      <h4 class="mb-2">테두리 두께</h4>
      <v-slider
        v-model="localStrokeWidth"
        :min="1"
        :max="20"
        :step="1"
        hide-details
        @update:model-value="emit('update-stroke-width', localStrokeWidth)"
      >
        <template #append>
          <v-text-field
            v-model="localStrokeWidth"
            type="number"
            density="compact"
            hide-details
            single-line
            style="width: 70px"
            :min="1"
            :max="20"
            @blur="clampStrokeWidth"
          />
        </template>
      </v-slider>
    </div>

    <!-- 테두리 스타일 -->
    <div class="mb-6">
      <h4 class="mb-2">테두리 스타일</h4>
      <v-select
        v-model="localStrokeStyle"
        :items="strokeStyles"
        label="스타일 선택"
        density="compact"
        hide-details
        @update:model-value="emit('update-stroke-style', localStrokeStyle)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ColorSelector from '@/components/ColorSelector.vue'

const props = defineProps<{
  layer: {
    filled?: boolean
    fillColor?: string
    strokeColor?: string
    strokeWidth?: number
    strokeStyle?: string
    [key: string]: any
  }
}>()

const emit = defineEmits([
  'update-filled',
  'update-fill-color',
  'update-stroke-color',
  'update-stroke-width',
  'update-stroke-style'
])

const localFilled = ref(props.layer.filled ?? true)
const localFillColor = ref(props.layer.fillColor ?? '#2ecc71')
const localStrokeColor = ref(props.layer.strokeColor ?? '#000000')
const localStrokeWidth = ref(props.layer.strokeWidth ?? 1)
const localStrokeStyle = ref(props.layer.strokeStyle ?? 'solid')

const strokeStyles = ['solid', 'dashed', 'dotted']

function updateFillColor(color: string) {
  localFillColor.value = color
  emit('update-fill-color', color)
}

function updateStrokeColor(color: string) {
  localStrokeColor.value = color
  emit('update-stroke-color', color)
}

function clampStrokeWidth() {
  if (localStrokeWidth.value < 1) localStrokeWidth.value = 1
  if (localStrokeWidth.value > 20) localStrokeWidth.value = 20
  emit('update-stroke-width', localStrokeWidth.value)
}

watch(() => props.layer.filled, val => localFilled.value = val ?? true)
watch(() => props.layer.fillColor, val => localFillColor.value = val ?? '#2ecc71')
watch(() => props.layer.strokeColor, val => localStrokeColor.value = val ?? '#000000')
watch(() => props.layer.strokeWidth, val => localStrokeWidth.value = val ?? 1)
watch(() => props.layer.strokeStyle, val => localStrokeStyle.value = val ?? 'solid')
</script>

<style scoped>
.mb-6 {
  margin-bottom: 24px;
}
</style>
