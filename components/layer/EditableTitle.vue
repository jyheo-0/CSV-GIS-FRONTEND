<template>
  <div
    class="editable-title"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <template v-if="editing">
      <v-text-field
        v-model="editValue"
        density="compact"
        hide-details
        variant="solo"
        autofocus
        single-line
        class="editable-input"
        @keyup.enter="submit"
        @blur="submit"
      >
        <template #append-inner>
          <v-icon size="16" class="mr-1" @click.stop="cancelEdit" style="cursor: pointer;">
            mdi-close
          </v-icon>
        </template>
      </v-text-field>
      
    </template>
    <template v-else>
      <div class="d-flex align-center" @click.stop="startEdit">
        <span class="editable-text">{{ name }}</span>
        <v-icon
          v-if="hover"
          class="ml-1"
          size="16"
          color="grey"
        >
          mdi-pencil
        </v-icon>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  name: string
}>()
const emit = defineEmits<{
  (e: 'rename', value: string): void
}>()

const hover = ref(false)
const editing = ref(false)
const editValue = ref(props.name)

watch(() => props.name, (newVal) => {
  editValue.value = newVal
})

function startEdit() {
  editing.value = true
}

function submit() {
  editing.value = false
  const trimmed = editValue.value.trim()
  if (trimmed && trimmed !== props.name) {
    emit('rename', trimmed)
  }
}

function cancelEdit() {
  editing.value = false
  editValue.value = props.name // 원래대로 복구
}
</script>

<style scoped>
::v-deep(.editable-input .v-input__control) {
  width: 150px !important;
}
::v-deep(.editable-input .v-field__input) {
  font-size: 13px !important;
}
.editable-title {
  cursor: text;
  position: relative;
  display: inline-block;
}

/* 연필 아이콘 항상 차지할 공간 */
.editable-title .v-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* hover하면 보이게 */
.editable-title:hover .v-icon {
  opacity: 1;
}


</style>