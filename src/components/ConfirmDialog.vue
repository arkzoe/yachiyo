<template>
  <div class="yachiyo-confirm-overlay" @click.self="onCancel">
    <div class="yachiyo-confirm-box">
      <p class="yachiyo-confirm-who">确认窗口</p>
      <p class="yachiyo-confirm-text">{{ message }}</p>
      <div class="yachiyo-confirm-btns">
        <button type="button" class="tool-btn yachiyo-confirm-yes" @click="onConfirm">是</button>
        <button type="button" class="tool-btn yachiyo-confirm-no" @click="onCancel">否</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['confirm', 'cancel']);

function onConfirm() {
  emit('confirm');
}

function onCancel() {
  emit('cancel');
}
</script>

<style scoped>
.yachiyo-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.yachiyo-confirm-box {
  background: #c0c0c0;
  border: 3px outset #e0e0e0;
  padding: 20px 24px;
  max-width: 320px;
}
.yachiyo-confirm-who {
  margin: 0 0 10px 0;
  font-weight: bold;
}
.yachiyo-confirm-text {
  margin: 0 0 20px 0;
}
.yachiyo-confirm-btns {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.tool-btn {
  min-width: 50px;
  padding: 5px 10px;
  background-color: #c0c0c0;
  border: 2px outset #f0f0f0;
  font-weight: bold;
  cursor: pointer;
}
.tool-btn:active {
  border-style: inset;
}
</style>