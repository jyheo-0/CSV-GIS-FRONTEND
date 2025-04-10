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
          <p>샘플 데이터 5줄 (가짜)</p>
          <v-simple-table dense>
            <thead>
              <tr><th>열1</th><th>열2</th><th>열3</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>2</td><td>3</td></tr>
              <tr><td>4</td><td>5</td><td>6</td></tr>
              <tr><td>7</td><td>8</td><td>9</td></tr>
              <tr><td>10</td><td>11</td><td>12</td></tr>
              <tr><td>13</td><td>14</td><td>15</td></tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </template>

      <!-- Step 3 -->
      <template v-slot:item.3>
        <v-card flat title="클라우드 변환" class="pa-4 mb-4">
          <p>이제 지도 보러 가자~</p>
          <v-btn color="success" @click="navigateTo('/map-edit')">지도 보기로 이동</v-btn>
        </v-card>
      </template>
    </v-stepper>
  </v-container>
</template>

<script setup>
const step = ref(1)
</script>
