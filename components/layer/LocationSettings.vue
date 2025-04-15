<!-- LocationSettings.vue -->
<template>
    <div class="px-4 py-2">
      <v-select
        :items="columns"
        label="위도 컬럼"
        v-model="localLat"
        density="compact"
        @update:model-value="$emit('update-lat-column', localLat)"
      />
  
      <v-select
        :items="columns"
        label="경도 컬럼"
        v-model="localLng"
        density="compact"
        @update:model-value="$emit('update-lng-column', localLng)"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    layer: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    }
  })
  
  const emit = defineEmits(['update-lat-column', 'update-lng-column'])
  
  const localLat = ref(props.layer.latColumn || '')
  const localLng = ref(props.layer.lngColumn || '')
  
  watch(() => props.layer.latColumn, (val) => (localLat.value = val))
  watch(() => props.layer.lngColumn, (val) => (localLng.value = val))
  </script>
  