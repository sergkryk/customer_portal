<script setup lang="ts">
const emit = defineEmits(['logout']);

function handleClick() {
    emit('logout');
}
</script>

<template>
  <button type="button" class="logout-btn" @click="handleClick">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="icon"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  </button>
</template>

<style scoped>
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.icon {
  width: 24px;
  height: 24px;
}
</style>