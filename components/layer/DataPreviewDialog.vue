<template>
  <v-dialog :model-value="modelValue" max-width="600px" @update:modelValue="emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">데이터 미리보기</v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th v-for="(col, i) in columns" :key="i">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in previewRows" :key="i">
              <td v-for="(col, j) in columns" :key="j">{{ row[col] }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="emit('update:modelValue', false)">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  columns: string[]
  previewRows: Record<string, any>[]
}>()
const emit = defineEmits(['update:modelValue'])
</script>
