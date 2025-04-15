<template>
  <v-container class="pa-6">
    <v-stepper :items="['Step 1', 'Step 2', 'Step 3']" v-model="step">
      <!-- Step 1 -->
      <template v-slot:item.1>
        <v-card flat title="파일 업로드" class="pa-4 mb-4">
          <v-file-input label="CSV 파일 업로드" />
        </v-card>
      </template>

      <!-- Step 2 -->
      <template v-slot:item.2>
        <v-card flat title="설정" class="pa-4 mb-4">
          <p>샘플 데이터</p>
        </v-card>
      </template>

      <!-- Step 3 -->
      <template v-slot:item.3>
        <v-card flat title="클라우드 변환" class="pa-4 mb-4">
          <v-btn color="success" @click="navigateTo('/map-edit')">지도 보기로 이동</v-btn>
        </v-card>
      </template>
    </v-stepper>
  </v-container>
</template>

<script setup>
const step = ref(1)
</script>
