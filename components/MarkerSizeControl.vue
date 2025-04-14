<template>
    <div>
      <h4 class="mt-4 mb-1 text-sm">마커 크기</h4>
      <v-slider
        v-model="layer.size"
        :min="1"
        :max="99"
        :step="1"
        :disabled="advancedEnabled"
        class="align-center"
        hide-details
      >
        <template #append>
          <v-text-field
            v-model="layer.size"
            :disabled="advancedEnabled"
            density="compact"
            style="width: 70px"
            type="number"
            hide-details
            single-line
          />
        </template>
      </v-slider>
  
      <v-checkbox
        v-model="advancedEnabled"
        label="고급 크기 설정 (X/Y/Z)"
        hide-details
        class="mt-2"
      />
  
      <v-expand-transition>
        <div v-show="advancedEnabled" class="mt-2">
          <v-slider v-model="layer.scaleX" label="X" :min="1" :max="99" :step="1" class="mb-2">
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
  
          <v-slider v-model="layer.scaleY" label="Y" :min="1" :max="99" :step="1" class="mb-2">
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
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    layer: Object
  })
  
  const advancedEnabled = ref(false)
  </script>
  
  <style scoped>
  </style>