<template>
  <v-expansion-panels variant="accordion" class="mb-2">
    <v-expansion-panel elevation="1">
      <v-expansion-panel-title class="custom-title">
        <v-icon
          class="mr-2"
          style="cursor: pointer"
          @click.stop="layer.visible = !layer.visible"
          :icon="layer.visible ? 'mdi-eye' : 'mdi-eye-off'"
          :color="layer.visible ? 'light-grey' : 'grey'"
        >
        </v-icon>

          {{ layer.name }}
        </v-expansion-panel-title>


      <v-expansion-panel-text>
        <!-- 마커 타입 (카드 드롭다운) -->
        <h4 class="mb-2 text-sm">마커 타입</h4>
        <v-menu v-model="menuOpen" :close-on-content-click="false" offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="outlined" block>
              <div class="d-flex align-center">
                <!-- 🔽 인라인 SVG 미리보기 아이콘 -->
                <img
                  :src="`/makers/${selected.value}.svg`"
                  alt="icon"
                  width="20"
                  height="20"
                  class="mr-2"
                />
                <span>{{ selected.label || '마커 타입 선택' }}</span>
              </div>
            </v-btn>
          </template>

          <v-card width="300">
            <v-container>
              <v-row dense>
                <v-col
                  v-for="(item, index) in geometryOptions"
                  :key="index"
                  cols="4"
                >
                  <v-card
                    class="icon-thumb"
                    :class="{ selected: selected.value === item.value }"
                    @click="selectShape(item)"
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
          </v-card>
        </v-menu>

        <!-- 👇 마커 크기 조절 슬라이더 (기본) -->
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
          <template v-slot:append>
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

        <!-- 👇 고급 설정 체크박스 -->
        <v-checkbox
          v-model="advancedEnabled"
          label="고급 크기 설정 (X/Y/Z)"
          hide-details
        />

        <!-- 👇 고급 설정 XYZ 슬라이더 -->
        <v-expand-transition>
          <div v-show="advancedEnabled">
        <!-- X 축 -->
        <v-slider v-model="layer.scaleX" label="X" :min="1" :max="99" :step="1">
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

        <!-- Y 축 -->
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

        <!-- Z 축 -->
        <v-slider v-model="layer.scaleZ" label="Z" :min="1" :max="99":step="1" >
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

        <!-- 색상 선택 -->
        <h4 class="mt-4 mb-1 text-sm">마커 색상</h4>

        <!-- 프리셋 색상 -->
        <div class="d-flex align-center flex-wrap gap-2 mb-2">
          <div
            v-for="color in presetColors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="color-circle"
            :class="{ selected: layer.baseColor === color }"
            @click="layer.baseColor = color"
          />
        </div>

        <!-- 컬러피커 -->
        <v-color-picker
          v-model="layer.baseColor"
          flat
          hide-inputs
          hide-canvas
          class="rounded border custom-color-picker"
        />
        <div>
    <!-- 라벨 컬럼 선택 -->
    <h4 class="mt-4 mb-1 text-sm">마커 라벨 설정</h4>
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
  </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  layer: Object
})
const emit = defineEmits(['update'])

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

const menuOpen = ref(false)
const selected = ref(geometryOptions.find(opt => opt.value === 'none'))
const clusterEnabled = ref(true)

const advancedEnabled  = ref(false)

const presetColors = [
  '#ff6b6b',
  '#ffa94d',
  '#ffd43b',
  '#38b000',
  '#3bc9db',
  '#4c6ef5',
  '#845ef7',
  '#ffffff',
  '#000000'
]

// 예시용 CSV 헤더 리스트 (실제 CSV 파싱 후 동적으로 대입 가능)
const csvHeaders = ['이름', '주소', '설치년도', '관리번호']

// 설정 항목들
const labelField = ref('이름')
const labelPosition = ref('top')
const labelSize = ref(14)
const labelAlwaysVisible = ref(true)
const labelColor = ref('#333333')

const labelPositionOptions = [
  'top', 'right', 'bottom', 'left'
]

function selectShape(item) {
  selected.value = item
  menuOpen.value = false
  emit('update', { id: props.layer.id, type: item.value })
}

watch(() => props.layer.size, (val) => {
  if (val < 1) props.layer.size = 1
  if (val > 100) props.layer.size = 100
})
</script>

<style scoped>
.custom-title{
  background-color: #2c2c2c;
}
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
::v-deep(.v-expansion-panel-text__wrapper) {
  padding: 12px 0 !important;
}

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
  border: 2px solid ;
}

.custom-color-picker {
  width: 280px;
  padding: 0;
  min-width: unset;
  max-width: 100%;
}

/* 🎯 컬러피커 내부 간격 정리 */
::v-deep(.v-color-picker__controls) {
  padding: 0px 8px !important;
}
::v-deep(.v-color-picker__sliders) {
  gap: 2px !important; /* ← 이 값을 줄이면 간격이 줄어들어! */
}

.label-color-picker {
  width: 280px;
  height: 70px;
  padding: 0;
}
</style>
