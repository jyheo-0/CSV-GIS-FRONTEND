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
        style="max-width: 180px;"
        @keyup.enter="submit"
        @blur="submit"
      />
    </template>
    <template v-else>
      <div class="d-flex align-center" @click.stop="startEdit">
        <span>{{ name }}</span>
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
</script>

<style>
.editable-title {
  cursor: text;
}
</style>
