<template>
  <div class="counter-container">
    {{ t('counter.prefix') }}
    <div class="counter-wrapper">
      <div class="digital-clock">
        <span class="digital-bg">888888</span>
        <span id="firestore-counter" class="digital-fg">{{ displayCounter }}</span>
      </div>
    </div>
    {{ t('counter.suffix') }}
  </div>
 </template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const counter = ref(0)
const displayCounter = ref('000000')

watch(counter, (newVal) => {
  displayCounter.value = newVal.toString().padStart(6, '0')
})

onMounted(() => {
  // 读取本地存储的计数，默认为0
  let count = localStorage.getItem('visitorCount')
  count = count ? parseInt(count, 10) : 0
  count += 1
  localStorage.setItem('visitorCount', count.toString())
  counter.value = count
})
</script>

<style scoped>
/* 原样式保持不变，可自行微调 */
.counter-wrapper {
  background-color: #0a0a1a;
  display: inline-block;
  padding: 3px 6px;
  border: 1px solid #333;
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
  vertical-align: middle;
  position: relative;
  margin: 0 5px;
}
.digital-clock {
  font-family: "DSEG7-Classic", monospace;
  font-size: 28px;
  letter-spacing: 2px;
  line-height: 1;
  position: relative;
}
.digital-bg {
  color: #1a3a1a;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.digital-fg {
  color: #32ff32;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 4px #00ff00;
}
</style>
