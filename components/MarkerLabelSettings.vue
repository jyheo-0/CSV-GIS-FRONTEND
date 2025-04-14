<template>
    <div class="mt-6">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="px-2 py-1 text-sm">라벨 설정</v-expansion-panel-title>
          <v-expansion-panel-text class="pt-2">
            <!-- 라벨 컬럼 선택 -->
            <v-select
              v-model="labelField"
              :items="csvHeaders"
              label="라벨로 표시할 컬럼"
              variant="outlined"
              density="compact"
              clearable
              class="mb-3"
            />
  
            <!-- 라벨 위치 선택 -->
            <v-select
              v-model="labelPosition"
              :items="labelPositionOptions"
              label="라벨 위치"
              variant="outlined"
              density="compact"
              class="mb-3"
            />
  
            <!-- 라벨 크기 조절 -->
            <div class="d-flex align-center mb-3">
              <span class="mr-2" style="width: 80px">라벨 크기</span>
              <v-slider
                v-model="labelSize"
                :min="10"
                :max="24"
                :step="1"
                hide-details
                style="flex: 1"
              >
                <template #append>
                  <v-text-field
                    v-model="labelSize"
                    type="number"
                    density="compact"
                    hide-details
                    single-line
                    style="width: 60px"
                  />
                </template>
              </v-slider>
            </div>
  
            <!-- 라벨 항상 표시 여부 -->
            <v-switch
              v-model="labelAlwaysVisible"
              label="항상 표시 (끄면 hover 시에만 보임)"
              class="mt-1"
            />
  
            <!-- 라벨 색상 선택 -->
            <v-color-picker
              v-model="labelColor"
              flat
              hide-canvas
              hide-inputs
              class="rounded border mt-3 label-color-picker"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    csvHeaders: Array,
    labelField: String,
    labelPosition: String,
    labelSize: Number,
    labelAlwaysVisible: Boolean,
    labelColor: String
  })
  
  const emit = defineEmits([
    'update:labelField',
    'update:labelPosition',
    'update:labelSize',
    'update:labelAlwaysVisible',
    'update:labelColor'
  ])
  
  const labelField = defineModel('labelField')
  const labelPosition = defineModel('labelPosition')
  const labelSize = defineModel('labelSize')
  const labelAlwaysVisible = defineModel('labelAlwaysVisible')
  const labelColor = defineModel('labelColor')
  
  const labelPositionOptions = ['top', 'right', 'bottom', 'left']
  </script>
  
  <style scoped>
  .label-color-picker {
    width: 280px;
    height: 70px;
    padding: 0;
  }
  ::v-deep(.v-color-picker__controls) {
    padding: 4px 8px !important;
    gap: 8px !important;
  }
  ::v-deep(.v-slider) {
    margin: 0 !important;
    height: 16px !important;
    --v-slider-track-size: 2px;
    flex: 1;
  }
  </style>