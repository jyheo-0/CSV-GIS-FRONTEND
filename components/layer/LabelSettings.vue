<template>
  <div>
    <!-- 라벨 컬럼 -->
    <div class="mb-6">
      <h4 class="mb-2">라벨 컬럼</h4>
      <v-select
        v-model="localLabelColumn"
        :items="['(라벨 없음)', ...columns]"
        label="라벨에 사용할 컬럼"
        density="compact"
        hide-details
        @update:modelValue="onLabelChange"
      />
    </div>

    <!-- 라벨 크기 -->
    <div class="mb-6">
      <h4 class="mb-2">폰트 크기</h4>
      <v-slider
        v-model="localLabelSize"
        :min="8"
        :max="36"
        :step="1"
        hide-details
        @update:model-value="emit('update-label-size', localLabelSize)"
      >
        <template #append>
          <v-text-field
            v-model="localLabelSize"
            type="number"
            :min="8"
            :max="36"
            density="compact"
            hide-details
            single-line
            style="width: 70px"
            @update:model-value="emit('update-label-size', localLabelSize)"
            @blur="clampLabelSize"
          />
        </template>
      </v-slider>
    </div>

    <!-- 라벨 색상 -->
    <div class="mb-6">
      <h4 class="mb-2">글자 색상</h4>
      <ColorSelector
        :color="layer.labelColor"
        @update-color="emit('update-label-color', $event)"
      />
    </div>

    <!-- 라벨 테두리 색상 -->
    <div class="mb-6">
      <h4 class="mb-2">테두리 색상</h4>
      <ColorSelector
        :color="layer.labelStrokeColor"
        @update-color="emit('update-label-stroke-color', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ColorSelector from '@/components/ColorSelector.vue'
import { presetColors } from '@/constants/presetColors'

const props = defineProps<{
  layer: any
  columns: string[]
}>()

const emit = defineEmits<{
  (e: 'update-label-column', value: string | null): void
  (e: 'update-label-size', value: number): void
  (e: 'update-label-color', value: string): void
  (e: 'update-label-stroke-color', value: string): void
}>()

const localLabelColumn = ref(props.layer.labelColumn ?? null)
const localLabelSize = ref(Number(props.layer.labelSize ?? 14))

function onLabelChange(value: string) {
  emit('update-label-column', value === '(라벨 없음)' ? null : value)
}

function clampLabelSize() {
  if (localLabelSize.value < 8) localLabelSize.value = 8
  if (localLabelSize.value > 36) localLabelSize.value = 36
  emit('update-label-size', localLabelSize.value)
}

watch(() => props.layer.labelColumn, val => {
  localLabelColumn.value = val ?? null
})
watch(() => props.layer.labelSize, val => {
  localLabelSize.value = Number(val ?? 14)
})
</script>

<style scoped>
.mb-6 {
  margin-bottom: 24px;
}
</style>
