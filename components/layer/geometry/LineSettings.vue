<template>
  <div>
    <!-- 선 색상 -->
    <div class="mb-6">
      <h4 class="mb-2">선 색상</h4>
      <ColorSelector
        :color="localColor"
        @update-color="updateColor"
      />
    </div>

    <!-- 선 두께 -->
    <div class="mb-6">
      <h4 class="mb-2">선 두께</h4>
      <v-slider
        v-model="localWidth"
        :min="1"
        :max="20"
        :step="1"
        hide-details
        @update:model-value="emit('update-line-width', localWidth)"
      >
        <template #append>
          <v-text-field
            v-model="localWidth"
            type="number"
            density="compact"
            hide-details
            single-line
            style="width: 70px"
            :min="1"
            :max="20"
            @blur="clampWidth"
          />
        </template>
      </v-slider>
    </div>

    <!-- 선 스타일 -->
    <div class="mb-6">
      <h4 class="mb-2">선 스타일</h4>
      <v-select
        v-model="localStyle"
        :items="lineStyles"
        label="스타일 선택"
        density="compact"
        hide-details
        @update:model-value="emit('update-line-style', localStyle)"
      />
    </div>

    <!-- 방향 표시 -->
    <div class="mb-6">
      <v-switch
        v-model="localArrow"
        label="방향 표시 (화살표)"
        hide-details
        @update:model-value="emit('update-arrow', localArrow)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ColorSelector from '@/components/ColorSelector.vue'

const props = defineProps<{
  layer: {
    strokeColor?: string
    lineWidth?: number
    lineStyle?: string
    showArrow?: boolean
    [key: string]: any
  }
}>()

const emit = defineEmits([
  'update-color',
  'update-line-width',
  'update-line-style',
  'update-arrow'
])

const localColor = ref(props.layer.strokeColor ?? '#3498db')
const localWidth = ref(props.layer.lineWidth ?? 2)
const localStyle = ref(props.layer.lineStyle ?? 'solid')
const localArrow = ref(props.layer.showArrow ?? false)

const lineStyles = ['solid', 'dashed', 'dotted']

function updateColor(color: string) {
  localColor.value = color
  emit('update-color', color)
}

function clampWidth() {
  if (localWidth.value < 1) localWidth.value = 1
  if (localWidth.value > 20) localWidth.value = 20
  emit('update-line-width', localWidth.value)
}

watch(() => props.layer.strokeColor, val => localColor.value = val ?? '#3498db')
watch(() => props.layer.lineWidth, val => localWidth.value = val ?? 2)
watch(() => props.layer.lineStyle, val => localStyle.value = val ?? 'solid')
watch(() => props.layer.showArrow, val => localArrow.value = val ?? false)
</script>

<style scoped>
.mb-6 {
  margin-bottom: 24px;
}
</style>
