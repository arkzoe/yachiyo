import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import { OekaCore } from '../lib/oeka-core';

export function useOekaCore(canvasRef, options = {}) {
  const core = ref(null);
  const coreState = reactive({
    tool: 'pen',
    color: '#000000',
    size: 1,
    alpha: 1,
    currentLayer: 1,
    layerVisible: [true, true],
    // 添加其他需要 UI 同步的状态
  });

  onMounted(() => {
    if (!canvasRef.value) return;
    core.value = new OekaCore(canvasRef.value, {
      ...options,
      onStateChange: (newState) => {
        // 将新状态同步到响应式对象中
        Object.assign(coreState, newState);
      },
    });
  });

  onUnmounted(() => {
    // 可选的清理工作
    if (core.value) {
      // 移除事件监听等（如果需要）
    }
  });

  return { core, coreState };
}