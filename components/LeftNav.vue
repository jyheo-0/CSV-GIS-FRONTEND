<template>
    <div class="nav-drawer">
      <v-btn
        icon
        @click.stop="$emit('toggleLayer')"
        :color="active ? 'grey-darken-1' : undefined"
        variant="flat"
      >
        <v-icon>{{ active ? 'mdi-layers-outline' : 'mdi-layers' }}</v-icon>
      </v-btn>
      <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-chat-question</v-icon></v-btn>
    </div>
</template>

<script setup>
defineProps({
  active: Boolean // ← 열림 여부를 부모에서 넘겨줌
})
</script>
  
<style scoped>
.nav-drawer {
  width: 56px;
  height: 100vh;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  position: fixed; /* ✅ 고정! */
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>