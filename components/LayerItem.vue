<template>
  <v-expansion-panels variant="accordion" class="mb-2">
    <v-expansion-panel elevation="1">
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-eye</v-icon>
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
  { value: 'vertical-line', label: '수직선' },
  { value: 'cylinder', label: '실린더' },
  { value: 'circle', label: '원' },
  { value: 'sphere', label: '구' },
  { value: 'symbol', label: '심볼' },
  { value: 'point', label: '점' },
  { value: 'cone', label: '콘' },
  { value: 'icon', label: '아이콘' }
]

const menuOpen = ref(false)
const selected = ref(geometryOptions.find(opt => opt.value === props.layer.shape) || {})
const clusterEnabled = ref(true)

function selectShape(item) {
  selected.value = item
  menuOpen.value = false
  emit('update', { id: props.layer.id, type: item.value })
}

function getIconSVG(type) {
  switch (type) {
    case 'vertical-line':
      return `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="11" y="4" width="2" height="16" fill="#1E3A8A" />
              </svg>`
    case 'circle':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#3B82F6" /></svg>`
    case 'point':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#F97316" /></svg>`
    case 'sphere':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="url(#sphereGradient)" /><defs><radialGradient id="sphereGradient"><stop offset="0%" stop-color="#67e8f9"/><stop offset="100%" stop-color="#0e7490"/></radialGradient></defs></svg>`
    case 'cone':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 4L4 20H20L12 4Z" fill="#FACC15" /></svg>`
    case 'cylinder':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><rect x="8" y="4" width="8" height="16" rx="4" fill="#4ADE80" /></svg>`
    case 'icon':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2C10.3 2 9 3.3 9 5s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 6c-2.2 0-4 1.8-4 4v7h8v-7c0-2.2-1.8-4-4-4z" fill="#6366F1"/></svg>`
    case 'symbol':
      return `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" fill="#A855F7"/></svg>`
    default:
      return ''
  }
}
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
</style>
