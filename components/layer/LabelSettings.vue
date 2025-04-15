<template>
  <div>
    <!-- 라벨 컬럼 -->
    <div class="mb-6">
      <h4 class="mb-2">라벨 컬럼</h4>
      <v-select
        v-model="localLabelColumn"
        :items="['(라벨 없음)', ...columns]"
        density="compact"
        hide-details
        @update:modelValue="onLabelChange"
        class="label-select"
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
  v-model:color="localFontColor"
  @update-color="emit('update-label-color', $event)"
/>
    </div>

    <!-- 라벨 테두리 색상 -->
    <div class="mb-6">
      <h4 class="mb-2">테두리 색상</h4>
      <ColorSelector
  v-model:color="localStrokeColor"
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

const localLabelColumn = ref(props.layer.labelColumn ?? '(라벨 없음)')
const localLabelSize = ref(Number(props.layer.labelSize ?? 14))

const localFontColor = ref(props.layer.fontColor ?? '#000000') // 검정색
const localStrokeColor = ref(props.layer.strokeColor ?? '#FFFFFF') // 흰색



function onLabelChange(value: string) {
  emit('update-label-column', value === '(라벨 없음)' ? null : value)
}

function clampLabelSize() {
  if (localLabelSize.value < 8) localLabelSize.value = 8
  if (localLabelSize.value > 36) localLabelSize.value = 36
  emit('update-label-size', localLabelSize.value)
}

watch(() => props.layer.labelColumn, val => {
  localLabelColumn.value = val ?? '(라벨 없음)'
})
watch(() => props.layer.labelSize, val => {
  localLabelSize.value = Number(val ?? 14)
})

watch(() => props.layer.fontColor, (val) => {
  localFontColor.value = val ?? '#000000'
})

watch(() => props.layer.strokeColor, (val) => {
  localStrokeColor.value = val ?? '#FFFFFF'
})

</script>

<style scoped>
.label-select {
  font-size: 13px; /* 셀렉트 내부 글자 크기 */
}

.label-select :deep(.v-field__input),
.label-select :deep(.v-select__selection-text),
.label-select :deep(.v-label) {
  font-size: 13px !important;
}
</style>
