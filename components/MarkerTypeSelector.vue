<template>
    <div>
      <h4 class="mb-2 text-sm">마커 타입</h4>
      <v-menu v-model="menuOpen" :close-on-content-click="false" offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="outlined" block>
            <div class="d-flex align-center">
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
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    value: String
  })
  const emit = defineEmits(['update'])
  
  const menuOpen = ref(false)
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
  
  const selected = ref(geometryOptions.find(opt => opt.value === props.value) || geometryOptions[0])
  
  watch(() => props.value, val => {
    const match = geometryOptions.find(opt => opt.value === val)
    if (match) selected.value = match
  })
  
  function selectShape(item) {
    selected.value = item
    menuOpen.value = false
    emit('update', item.value)
  }
  </script>
  
  <style scoped>
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
  </style>
  