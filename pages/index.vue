<template>
    <v-container class="py-10 bg" fluid>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-6" elevation="4" color="surface">
            <v-card-title class="text-h5 text-primary font-weight-bold">
              파일 업로드
            </v-card-title>
            <v-card-subtitle class="text-primary mb-4">
              클릭 또는 드래그&드랍으로 업로드
            </v-card-subtitle>
  
            <!-- 드래그앤드랍 -->
            <div
              class="drop-zone"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
              @click="triggerFilePicker"
            >
              <v-icon size="48" color="primary">mdi-file-upload</v-icon>
              <p class="drop-text">
                {{ dragging ? '놓아주세요!' : '여기를 클릭하거나 드래그하여 업로드하세요.' }}
              </p>
              <input
                ref="hiddenInput"
                type="file"
                accept=".csv"
                class="d-none"
                @change="onFileChange"
              />
            </div>

            <!-- 업로드된 파일 정보 -->
<div v-if="csvFile" class="file-preview mt-4">
  <v-card class="file-card" flat>
    <v-card-text class="d-flex align-center justify-space-between pa-4">
      <!-- 아이콘 + 정보 -->
      <div class="d-flex align-center">
        <div class="file-icon-box mr-4">
          <v-icon size="48" color="primary">mdi-file-delimited</v-icon>
          <span class="format-badge">CSV</span>
        </div>
        <div>
          <div class="text-primary font-weight-medium">{{ csvFile.name }}</div>
          <div class="file-size text-primary">{{ formatFileSize(csvFile.size) }}</div>
        </div>
      </div>

      <!-- 삭제 버튼 -->
      <v-btn icon size="small" variant="text" @click="removeFile">
        <v-icon color="primary">mdi-close</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</div>

  
            <v-btn
              class="mt-6 btn-upload"
              color="primary"
              block
              @click="handleSubmit"
              :disabled="!csvFile"
            >
              업로드
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const csvFile = ref(null)
  const dragging = ref(false)
  const hiddenInput = ref(null)
  
  const onDragOver = () => dragging.value = true
  const onDragLeave = () => dragging.value = false
  const onDrop = (event) => {
    dragging.value = false
    const files = event.dataTransfer.files
    if (files.length && files[0].type === 'text/csv') {
      csvFile.value = files[0]
    }
  }
  
  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'text/csv') {
      csvFile.value = file
    }
  }

  const formatFileSize = (size) => {
  const mb = size / 1024 / 1024
  return mb.toFixed(1) + ' MB'
}
  
  const triggerFilePicker = () => hiddenInput.value.click()
  const removeFile = () => {
    csvFile.value = null
    hiddenInput.value.value = ''
  }
  
  const handleSubmit = () => {
    console.log('CSV 파일:', csvFile.value)
    router.push('/map')
  }
  </script>
  
<style scoped>
  .bg {
  background-color: #0e1518;
  min-height: 100vh;
  }
  
  .drop-zone {
  border: 2px dashed #DAE9F4;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: rgba(127, 158, 178, 0.1);
}

.drop-zone:hover {
  background-color: rgba(127, 158, 178, 0.25);
}
  
  .drop-text {
    margin-top: 8px;
    color: var(--v-theme-primary);
    font-size: 1rem;
  }
  
  .file-info-box {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--v-theme-primary);
    border-radius: 6px;
    padding: 12px;
  }
  
  .file-name {
    font-size: 0.95rem;
  }
  
  .d-none {
    display: none;
  }
  
  .btn-upload {
    font-weight: bold;
  }

  .file-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--secondary, #7F9EB2);
  border-radius: 8px;
}

.file-icon-box {
  position: relative;
  display: inline-block;
}

.format-badge {
  position: absolute;
  top: -6px;
  left: -6px;
  background-color: var(--secondary, #7F9EB2);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}
.file-size {
  font-size: 0.85rem;
  opacity: 0.8;
}

  </style>
  