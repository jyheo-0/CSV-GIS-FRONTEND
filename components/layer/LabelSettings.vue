<!-- LabelSettings.vue -->
<template>
  <div class="px-4 py-2">
    <v-select
      :items="columns"
      label="라벨에 사용할 컬럼"
      v-model="localLabelColumn"
      density="compact"
      @update:model-value="$emit('update-label-column', localLabelColumn)"
    />

    <v-select
      :items="['12px', '14px', '16px', '18px']"
      label="폰트 크기"
      v-model="localLabelSize"
      density="compact"
      @update:model-value="$emit('update-label-size', localLabelSize)"
    />
  </div>
</template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
  layer: {
    type: Object,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})
  
const emit = defineEmits(['update-label-column', 'update-label-size'])
  
  const localLabelText = ref(props.layer.labelText || '')
  const localLabelSize = ref(props.layer.labelSize || '12px')
  
  // 동기화용 (부모값이 바뀌면 반영)
  watch(() => props.layer.labelText, val => localLabelText.value = val)
  watch(() => props.layer.labelSize, val => localLabelSize.value = val)
  </script>
  