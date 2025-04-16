<template>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="레이어 이름"
          @blur="emit('rename', name)"
          dense
        />
      </v-col>
  
      <v-col cols="12">
        <v-btn block color="info" @click="$emit('preview')">데이터 미리보기</v-btn>
      </v-col>
  
      <v-col cols="12">
        <v-btn block color="success" @click="$emit('export')">CSV 내보내기</v-btn>
      </v-col>
  
      <v-col cols="12">
        <v-btn block color="error" @click="$emit('delete')">레이어 삭제</v-btn>
      </v-col>
    </v-row>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  const props = defineProps<{ layer: { name: string } }>()
  const emit = defineEmits(['rename', 'preview', 'export', 'delete'])
  
  const name = ref(props.layer.name)
  watch(() => props.layer.name, (val) => name.value = val)
  </script>
  