<template>
  <v-expansion-panels variant="accordion" class="mb-2">
    <v-expansion-panel elevation="1">
      <v-expansion-panel-title>
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

          <v-card width="255">
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
  class="mt-2"
/>

<!-- 👇 고급 설정 XYZ 슬라이더 -->
<v-expand-transition>
  <div v-show="advancedEnabled" class="mt-2">
<!-- X 축 -->
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

<!-- Y 축 -->
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
        <h4 class="mt-4 mb-1 text-sm">기본 색상</h4>
        <v-color-picker
          v-model="layer.baseColor"
          flat
          hide-inputs
          hide-canvas
          class="rounded border"
        />

        <!-- 클러스터 -->
        <v-switch
          v-model="clusterEnabled"
          label="클러스터 활성화"
          class="mt-4"
        />
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
  { value: 'none', label: '미선택' },
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

function selectShape(item) {
  selected.value = item
  menuOpen.value = false
  emit('update', { id: props.layer.id, type: item.value })
}

watch(() => layer.size, (val) => {
  if (val < 1) layer.size = 1
  if (val > 100) layer.size = 100
})

</script>

<style scoped>
.icon-thumb {
  width: 100%;
  height: 65px;
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
</style>
