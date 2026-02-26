<template>
  <div class="mini-oekaki-toolbar">
    <!-- 撤销/重做 -->
    <div class="tool-group">
      <button class="tool-btn undo-redo-btn" :disabled="!hasUndo" @click="core?.undo()">☾</button>
      <button class="tool-btn undo-redo-btn" :disabled="!hasRedo" @click="core?.redo()">☽</button>
    </div>
    <!-- 工具按钮 -->
    <div class="tool-group">
      <button
        v-for="tool in tools"
        :key="tool.id"
        class="tool-btn"
        :class="{ active: coreState.tool === tool.id }"
        @click="setTool(tool.id)"
      >
        {{ tool.label }}
      </button>
    </div>
    <!-- 清除按钮 -->
    <div class="tool-group">
      <button class="tool-btn" @click="$emit('clear')">清除全部</button>
    </div>
    <!-- 抓手按钮 -->
    <div class="tool-group">
      <button class="tool-btn handle-btn" :class="{ active: handleMode }" @click="$emit('toggle-handle')">
        (手)
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  core: Object,
  coreState: Object,
  handleMode: Boolean,
});

const emit = defineEmits(['clear', 'toggle-handle']);

const tools = [
  { id: 'pen', label: '画笔' },
  { id: 'eraser', label: '橡皮' },
  { id: 'tone', label: '网点' },
  { id: 'fill', label: '填充' },
  { id: 'rect', label: '矩形' },
  { id: 'circle', label: '圆形' },
];

const hasUndo = computed(() => props.core?.hasUndo() ?? false);
const hasRedo = computed(() => props.core?.hasRedo() ?? false);

function setTool(toolId) {
  props.core?.setTool(toolId);
}
</script>

<style scoped>
.mini-oekaki-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 8px;
  border: 2px outset #ccc;
  background: #c0c0c0;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}
.tool-group {
  display: flex;
  align-items: center;
  margin: 4px;
}
.tool-group button {
  min-width: 30px;
  height: 30px;
  margin: 0 2px;
  padding: 5px;
  background-color: #c0c0c0;
  border: 2px outset #f0f0f0;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
.tool-group button:active,
.tool-group button.active {
  border-style: inset;
  background-color: #ddd;
}
.undo-redo-btn {
  color: #FDDF58;
  text-shadow: 0 0 1px #333;
}
.undo-redo-btn:disabled {
  color: #999;
}
.handle-btn {
  color: #5a7a8a;
  text-shadow: 0 0 1px #333;
}
</style>