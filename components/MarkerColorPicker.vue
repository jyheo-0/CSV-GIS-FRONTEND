<template>
    <div>
      <h4 class="mt-4 mb-1 text-sm">마커 색상</h4>
  
      <div class="d-flex align-center flex-wrap gap-2 mb-2">
        <div
          v-for="color in presetColors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="color-circle"
          :class="{ selected: color === modelValue }"
          @click="$emit('update:color', color)"
        />
      </div>
  
      <v-color-picker
        :model-value="modelValue"
        @update:model-value="$emit('update:color', $event)"
        flat
        hide-inputs
        hide-canvas
        class="rounded border custom-color-picker"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: String,
    presetColors: Array
  })
  const emit = defineEmits(['update:color'])
  </script>
  
  <style scoped>
  .color-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: transform 0.2s;
    margin-left: 7px;
  }
  .color-circle:hover {
    transform: scale(1.1);
  }
  .color-circle.selected {
    border: 2px solid #2196f3;
  }
  .custom-color-picker {
    width: 280px;
    padding: 0;
    min-width: unset;
    max-width: 100%;
  }
  ::v-deep(.v-color-picker__controls) {
    padding: 0px 8px !important;
  }
  ::v-deep(.v-color-picker__sliders) {
    gap: 2px !important;
  }
  </style>