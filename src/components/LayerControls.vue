<template>
  <div class="layer-box">
    <div class="layer-row">
      <button class="layer-eye-btn" :class="{ hidden: !coreState.layerVisible[0] }" @click="toggleLayer(0)">
        ◎
      </button>
      <button class="tool-btn layer-label-btn" :class="{ active: coreState.currentLayer === 0 }" @click="setLayer(0)">
        BG
      </button>
    </div>
    <div class="layer-row">
      <button class="layer-eye-btn" :class="{ hidden: !coreState.layerVisible[1] }" @click="toggleLayer(1)">
        ◎
      </button>
      <button class="tool-btn layer-label-btn" :class="{ active: coreState.currentLayer === 1 }" @click="setLayer(1)">
        FG
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  core: Object,
  coreState: Object,
});

function toggleLayer(index) {
  const visible = !props.coreState.layerVisible[index];
  props.core?.setLayerVisible(index, visible);
}

function setLayer(index) {
  props.core?.setCurrentLayer(index);
}
</script>

<style scoped>
.layer-box {
  width: 68px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px outset #ccc;
  background: #c0c0c0;
  padding: 4px;
}
.layer-row {
  display: flex;
  align-items: center;
  gap: 4px;
}
.layer-eye-btn {
  width: 26px;
  height: 26px;
  font-size: 16px;
  background: #c0c0c0;
  border: 2px outset #f0f0f0;
  color: #FDDF58;
  cursor: pointer;
}
.layer-eye-btn.hidden {
  opacity: 0.4;
  color: #999;
}
.tool-btn.layer-label-btn {
  flex: 1;
  height: 26px;
  background-color: #c0c0c0;
  border: 1px outset #f0f0f0;
  font-weight: bold;
  cursor: pointer;
  width: 29px;
}
.tool-btn.layer-label-btn.active {
  border-style: inset;
  background-color: #ddd;
}
</style>