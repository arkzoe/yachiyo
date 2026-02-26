<template>
  <div class="zoom-group">
    <button class="tool-btn" :disabled="zoomIndex <= 0" @click="$emit('zoom-out')">−</button>
    <span class="zoom-label">{{ Math.round(zoom * 100) }}%</span>
    <button class="tool-btn" :disabled="zoomIndex >= zoomLevels.length - 1" @click="$emit('zoom-in')">+</button>
  </div>
</template>

<script setup>
defineProps({
  zoom: Number,
  zoomIndex: Number,
  zoomLevels: Array,
});
defineEmits(['zoom-in', 'zoom-out']);
</script>

<style scoped>
.zoom-group {
  display: flex;
  align-items: center;
  margin-left: 8px;
  flex-shrink: 0;
}
.zoom-group button {
  min-width: 30px;
  height: 30px;
  margin: 0 2px;
  padding: 5px;
  background-color: #c0c0c0;
  border: 2px outset #f0f0f0;
  font-weight: bold;
  cursor: pointer;
}
.zoom-group button:active {
  border-style: inset;
}
.zoom-group button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.zoom-label {
  min-width: 50px;
  text-align: center;
  font-weight: bold;
}
</style>