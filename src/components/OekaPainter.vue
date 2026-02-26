<template>
  <div class="oeka-shell">
    <main class="oeka-main">
      <div class="oeka-canvas-panel">
        <!-- 工具栏 -->
        <Toolbar
          :core="core"
          :coreState="coreState"
          :handleMode="handleMode"
          @clear="showConfirm = true"
          @toggle-handle="toggleHandleMode"
        />
        <!-- 画布行 -->
        <div class="canvas-row">
          <!-- 左侧调色板区域 -->
          <Palette :core="core" :coreState="coreState" />
          <!-- 右侧画布包装器 -->
          <div class="canvas-wrapper" ref="canvasWrapper">
            <div class="canvas-scroll-area" ref="scrollArea">
              <div class="canvas-stage" ref="stage">
                <div
                  class="canvas-zoom-wrap"
                  ref="zoomWrap"
                  :style="{
                    width: displayWidth + 'px',
                    height: displayHeight + 'px',
                    left: canvasOffsetX + 'px',
                    top: canvasOffsetY + 'px',
                    position: 'absolute'
                  }"
                >
                  <!-- 唯一画布：可见、用于绘制和事件 -->
                  <canvas
                    ref="mainCanvas"
                    :width="logicalWidth"
                    :height="logicalHeight"
                    style="display: block; image-rendering: pixelated; width: 100%; height: 100%;"
                  ></canvas>
                  <!-- 笔刷预览光标 -->
                  <div
                    v-if="!handleMode && coreState.tool !== 'fill' && coreState.tool !== 'tone'"
                    class="brush-cursor"
                    :class="{ visible: cursorVisible }"
                    :style="cursorStyle"
                  ></div>
                </div>
              </div>
            </div>
            <!-- 抓手覆盖层 -->
            <div
              v-if="handleMode"
              class="canvas-pan-overlay"
              ref="panOverlay"
              @pointerdown="startPan"
            ></div>
          </div>
        </div>
        <!-- 底部缩放控件 -->
        <ZoomControls
          :zoom="zoom"
          :zoomIndex="zoomIndex"
          :zoomLevels="zoomLevels"
          @zoom-in="zoomIn"
          @zoom-out="zoomOut"
        />
      </div>
    </main>
    <!-- 确认对话框 -->
    <Teleport to="body">
      <ConfirmDialog
        v-if="showConfirm"
        message="确定要全部擦掉吗？"
        @confirm="handleClearConfirm"
        @cancel="showConfirm = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';
import Toolbar from './Toolbar.vue';
import Palette from './Palette.vue';
import ZoomControls from './ZoomControls.vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { useOekaCore } from '../composables/useOekaCore';

// 引用唯一画布
const mainCanvas = ref(null);
const canvasWrapper = ref(null);
const scrollArea = ref(null);
const stage = ref(null);
const zoomWrap = ref(null);
const panOverlay = ref(null);

// 初始化核心，传入唯一画布
const { core, coreState } = useOekaCore(mainCanvas, {
  // 可以传入额外选项
});

// 逻辑尺寸固定
const logicalWidth = 300;
const logicalHeight = 300;

// 缩放相关
const zoomLevels = [0.4, 0.6, 1, 1.4, 2, 2.6, 4];
const zoomIndex = ref(2);
const zoom = computed(() => zoomLevels[zoomIndex.value]);
const canvasOffsetX = ref(0);
const canvasOffsetY = ref(0);
const displayWidth = ref(0);
const displayHeight = ref(0);

// 抓手模式
const handleMode = ref(false);
const panning = ref(false);
const startPanPos = reactive({ x: 0, y: 0 });
const startOffset = reactive({ x: 0, y: 0 });

// 笔刷光标
const cursorVisible = ref(false);
const cursorStyle = ref({});

// 确认对话框
const showConfirm = ref(false);

// 更新显示尺寸
function updateDisplaySize() {
  displayWidth.value = logicalWidth * zoom.value;
  displayHeight.value = logicalHeight * zoom.value;
}

// 应用缩放并调整位置（保持中心）
function applyZoom() {
  updateDisplaySize();
  if (zoomWrap.value) {
    const oldW = zoomWrap.value.offsetWidth;
    const oldH = zoomWrap.value.offsetHeight;
    canvasOffsetX.value += (oldW - displayWidth.value) / 2;
    canvasOffsetY.value += (oldH - displayHeight.value) / 2;
  }
}

function zoomIn() {
  if (zoomIndex.value < zoomLevels.length - 1) {
    zoomIndex.value++;
    applyZoom();
  }
}
function zoomOut() {
  if (zoomIndex.value > 0) {
    zoomIndex.value--;
    applyZoom();
  }
}

// 初始化位置（居中）
function initPosition() {
  if (!scrollArea.value || !zoomWrap.value) return;
  const sw = scrollArea.value.clientWidth;
  const sh = scrollArea.value.clientHeight;
  canvasOffsetX.value = Math.max(0, (sw - displayWidth.value) / 2);
  canvasOffsetY.value = Math.max(0, (sh - displayHeight.value) / 2);
}

// 监听滚动区域尺寸变化
const resizeObserver = new ResizeObserver(() => {
  // 可以根据需要调整位置，这里先不处理
});

onMounted(() => {
  if (scrollArea.value) {
    resizeObserver.observe(scrollArea.value);
  }
  applyZoom();
  initPosition();

  // 当 core 准备好后，可能还需要额外初始化
  watch(core, (newCore) => {
    if (newCore) {
      // 可以在此处进行一些后续操作
    }
  }, { immediate: true });
});

onUnmounted(() => {
  resizeObserver.disconnect();
});

// 抓手事件
function startPan(e) {
  if (!handleMode.value) return;
  e.preventDefault();
  panning.value = true;
  startPanPos.x = e.clientX;
  startPanPos.y = e.clientY;
  startOffset.x = canvasOffsetX.value;
  startOffset.y = canvasOffsetY.value;
  if (panOverlay.value) panOverlay.value.style.cursor = 'grabbing';

  const onMove = (e) => {
    if (!panning.value) return;
    e.preventDefault();
    canvasOffsetX.value = startOffset.x + (e.clientX - startPanPos.x);
    canvasOffsetY.value = startOffset.y + (e.clientY - startPanPos.y);
  };
  const onUp = () => {
    panning.value = false;
    if (panOverlay.value) panOverlay.value.style.cursor = 'grab';
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointercancel', onUp);
  };
  document.addEventListener('pointermove', onMove, { passive: false });
  document.addEventListener('pointerup', onUp);
  document.addEventListener('pointercancel', onUp);
}

function toggleHandleMode() {
  handleMode.value = !handleMode.value;
}

// 笔刷光标逻辑
function updateCursor(e) {
  if (!mainCanvas.value || !zoomWrap.value || handleMode.value) {
    cursorVisible.value = false;
    return;
  }
  const rect = mainCanvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
    cursorVisible.value = false;
    return;
  }
  const sizeLogical = Math.max(1, coreState.size);
  const sizeScreen = Math.max(2, Math.round(sizeLogical * zoom.value));
  const wrapRect = zoomWrap.value.getBoundingClientRect();
  cursorStyle.value = {
    left: (e.clientX - wrapRect.left - sizeScreen / 2) + 'px',
    top: (e.clientY - wrapRect.top - sizeScreen / 2) + 'px',
    width: sizeScreen + 'px',
    height: sizeScreen + 'px',
    border: coreState.tool === 'eraser' ? '1px dashed #666' : 'none',
    boxShadow: '0 0 0 0.5px rgba(255,255,255,0.9), 0 0 0 1px rgba(0,0,0,0.6)',
  };
  cursorVisible.value = true;
}

// 监听画布上的鼠标事件
onMounted(() => {
  const canvasEl = mainCanvas.value;
  if (!canvasEl) return;
  canvasEl.addEventListener('pointerenter', updateCursor);
  canvasEl.addEventListener('pointermove', updateCursor);
  canvasEl.addEventListener('pointerleave', () => { cursorVisible.value = false; });
});

// 清除确认
function handleClearConfirm() {
  core.value?.clear();
  showConfirm.value = false;
}
</script>

<style scoped>
.oeka-shell {
  display: flex;
  flex-direction: column;
  height: 100%;                /* 改为 100%，继承父容器高度 */
  width: 100%;
  margin: 0;
  padding: 0;                  /* 移除 padding，或转移到内部元素 */
  box-sizing: border-box;
  overflow: hidden;
}

.oeka-main {
  flex: 1;
  min-height: 0;
  display: flex;
  width: 100%;
  height: 700px;                /* 确保高度传递 */
}

.oeka-canvas-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 0;
  height: 660px;                /* 关键：为内部绝对定位提供参考 */
  box-sizing: border-box;
  background: #e0e0e0;
  padding: 12px;
  border: 2px outset #ccc;
}

.canvas-row {
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;                /* 确保绝对定位子元素有参考高度 */
  overflow: hidden;
}
.canvas-wrapper {
  position: absolute;
  left: 98px;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
}
.canvas-scroll-area {
  flex: 1;
  overflow: hidden; /* 允许滚动，便于调试 */
  border: 2px outset #999;
  background: #e0e0e0;
  border-radius: 4px;
  position: relative;
  min-height: 0;
}
.canvas-stage {
  position: relative;
  width: 100%;
  height: 600px;
  min-width: 100%;
  min-height: 100%;
}
.canvas-zoom-wrap {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.1); /* 临时背景，用于观察区域 */
}
.brush-cursor {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  box-sizing: border-box;
  display: none;
  z-index: 10;
}
.brush-cursor.visible {
  display: block;
}
.canvas-pan-overlay {
  position: absolute;
  inset: 0;
  background: transparent;
  cursor: grab;
  z-index: 5;
}
</style>