<template>
  <div class="mini-oekaki-palette-container palette-bundle">
    <!-- 2x8 调色板 -->
    <div id="color-palette">
      <div
        v-for="(color, index) in paletteColors"
        :key="index"
        class="color-swatch"
        :style="{ backgroundColor: color }"
        :class="{ active: selectedIndex === index }"
        @click="selectColor(index)"
      ></div>
    </div>
    <!-- 颜色选择器 -->
    <div class="slim-color-picker-wrap">
      <div class="slim-color-picker-inner">
        <input
          type="color"
          class="slim-color-picker-input"
          :value="coreState.color"
          @input="updateColor"
          title="选择颜色"
        />
      </div>
    </div>
    <!-- Size 和 OPA 滑块 -->
    <div class="palette-sliders-wrap">
      <div class="palette-slider-box">
        <div class="palette-size-slider" ref="sizeSlider" @pointerdown="startSizeDrag">
          <div class="palette-size-slider-bar">
            <div class="palette-slider-label-bg" :style="{ color: sizeLabelColor }">
              Size {{ coreState.size }}px
            </div>
            <div
              class="palette-size-slider-fill"
              :style="{ height: sizeFillPercent + '%', backgroundColor: coreState.color }"
            ></div>
          </div>
        </div>
      </div>
      <div class="palette-slider-box palette-opa-box">
        <div class="palette-opa-slider" ref="opaSlider" @pointerdown="startOpaDrag">
          <div class="palette-opa-slider-bar">
            <div class="palette-slider-label-bg" style="color: #fff;">
              OPA<br />{{ opaDisplay }}
            </div>
            <div
              class="palette-opa-slider-fill"
              :style="{ height: opaFillPercent + '%', backgroundColor: '#514154' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图层控制（独立组件） 但为了简化，可以直接放在这里或再拆分子组件 -->
    <LayerControls :core="core" :coreState="coreState" />
    <!-- 翻转按钮 -->
    <button class="tool-btn palette-extra-btn" @click="core?.flipHorizontal()">↔ 翻转</button>
    <!-- 保存按钮 -->
    <button class="tool-btn palette-extra-btn palette-save-btn" @click="save">⬇ 保存</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { hexToInverse } from '../lib/oeka-utils';
import LayerControls from './LayerControls.vue';

const props = defineProps({
  core: Object,
  coreState: Object,
});

const emit = defineEmits(['updateColor']);

// 初始调色板颜色
const paletteColors = ref([
  '#000000', '#FFFFFF', '#7f7f7f', '#c3c3c3',
  '#880015', '#ed1c24', '#ff7f27', '#fff200',
  '#22b14c', '#00a2e8', '#3f48cc', '#a349a4',
  '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0',
]);

const selectedIndex = ref(0);

// 更新选中色块
watch(() => props.coreState.color, (newColor) => {
  const idx = paletteColors.value.findIndex(c => c === newColor);
  if (idx !== -1) {
    selectedIndex.value = idx;
  }
}, { immediate: true });

function selectColor(index) {
  selectedIndex.value = index;
  const color = paletteColors.value[index];
  props.core?.setColor(color);
}

function updateColor(e) {
  const color = e.target.value;
  // 如果颜色不在调色板中，可以将当前选中色块更新为新颜色
  paletteColors.value[selectedIndex.value] = color;
  props.core?.setColor(color);
}

// Size 滑块
const sizeSlider = ref(null);
const sizeFillPercent = ref(0);
const sizeLabelColor = ref('#000');

watch(() => props.coreState.size, (size) => {
  sizeFillPercent.value = ((size - 1) / (88 - 1)) * 100;
  sizeLabelColor.value = hexToInverse(props.coreState.color);
}, { immediate: true });

function startSizeDrag(e) {
  e.preventDefault();
  const slider = sizeSlider.value;
  const rect = slider.getBoundingClientRect();

  function onMove(e) {
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    const rel = (y - rect.top) / rect.height;
    const size = Math.round(1 + (1 - rel) * (88 - 1));
    props.core?.setSize(Math.max(1, Math.min(88, size)));
  }

  onMove(e);
  const moveHandler = (e) => onMove(e);
  const upHandler = () => {
    document.removeEventListener('pointermove', moveHandler);
    document.removeEventListener('pointerup', upHandler);
    document.removeEventListener('pointercancel', upHandler);
  };
  document.addEventListener('pointermove', moveHandler, { passive: false });
  document.addEventListener('pointerup', upHandler);
  document.addEventListener('pointercancel', upHandler);
}

// OPA 滑块
const opaSlider = ref(null);
const opaFillPercent = ref(100);
const opaDisplay = computed(() => Math.round(props.coreState.alpha * 168));

watch(() => props.coreState.alpha, (alpha) => {
  opaFillPercent.value = alpha * 100;
}, { immediate: true });

function startOpaDrag(e) {
  e.preventDefault();
  const slider = opaSlider.value;
  const rect = slider.getBoundingClientRect();

  function onMove(e) {
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    const rel = (y - rect.top) / rect.height;
    const alpha = Math.max(0, Math.min(1, 1 - rel));
    props.core?.setAlpha(alpha);
  }

  onMove(e);
  const moveHandler = (e) => onMove(e);
  const upHandler = () => {
    document.removeEventListener('pointermove', moveHandler);
    document.removeEventListener('pointerup', upHandler);
    document.removeEventListener('pointercancel', upHandler);
  };
  document.addEventListener('pointermove', moveHandler, { passive: false });
  document.addEventListener('pointerup', upHandler);
  document.addEventListener('pointercancel', upHandler);
}

function save() {
  const url = props.core?.getPNGDataURL();
  if (url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yachiyo_oeka_' + new Date().toISOString().slice(0, 19).replace(/[:-]/g, '') + '.png';
    a.click();
  }
}
</script>

<style scoped>
.palette-bundle {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 88px;
  max-width: 88px;
  box-sizing: border-box;
  border: 2px outset #999;
  background: #b8b8b8;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
#color-palette {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(8, 1fr);
  width: 56px;
  gap: 2px;
  border: 2px outset #ccc;
  background: #c0c0c0;
  padding: 4px;
}
.color-swatch {
  width: 22px;
  height: 22px;
  border: 1px solid #777;
  cursor: pointer;
}
.color-swatch.active {
  outline: 2px solid #FDDF58;
  outline-offset: 1px;
}
.slim-color-picker-wrap {
  width: 68px;
  margin-top: 4px;
}
.slim-color-picker-inner {
  border: 2px outset #ccc;
  background: #c0c0c0;
  padding: 2px;
}
.slim-color-picker-input {
  width: 100%;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.palette-sliders-wrap {
  display: flex;
  gap: 4px;
  width: 68px;
  min-height: 120px;
}
.palette-slider-box {
  width: 32px;
  border: 2px outset #ccc;
  background: #c0c0c0;
  padding: 4px;
  position: relative;
}
.palette-size-slider, .palette-opa-slider {
  position: relative;
  width: 100%;
  height: 100px;
  background: #eee;
  border: 1px inset #999;
  cursor: ns-resize;
}
.palette-size-slider-bar, .palette-opa-slider-bar {
  position: relative;
  width: 100%;
  height: 100%;
}
.palette-slider-label-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  pointer-events: none;
}
.palette-size-slider-fill, .palette-opa-slider-fill {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #333;
  z-index: 1;
}
.palette-opa-slider-fill {
  background: #514154;
}
.palette-extra-btn {
  width: 68px;
  box-sizing: border-box;
  margin-top: 4px;
  font-size: 12px;
  background-color: #c0c0c0;
  border: 2px outset #f0f0f0;
  font-weight: bold;
  cursor: pointer;
}
.palette-extra-btn:active {
  border-style: inset;
}
</style>