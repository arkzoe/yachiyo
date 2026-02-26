<template>
  <Teleport to="body">
    <div class="loading-tip" v-show="loadingStore.isLoading">
      <span class="loading-text">加载中...</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/store/loading'
const loadingStore = useLoadingStore()
</script>

<style scoped>
/* 复古核心样式：仿老式网页/系统提示框风格 */
.loading-tip {
  /* 固定居中，仿老式弹窗定位 */
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 复古边框+背景：浅米色底+深色粗边框，仿CRT/老式网页 */
  padding: 15px 30px;
  background: #f8f0e0; /* 复古米黄色 */
  border: 2px solid #8b7355; /* 深木色边框 */
  border-radius: 0; /* 去掉圆角，复古直角 */
  box-shadow: 3px 3px 0 #665442; /* 复古投影，模拟阴影效果 */
  z-index: 9999;
  /* 复古字体+排版 */
  font-size: 16px;
  font-family: "SimSun", "宋体", "Gulim", "굴림", monospace; /* 复古宋体/等宽字体 */
}

.loading-text {
  /* 复古文字效果：深色+轻微描边 */
  color: #442c16; /* 深棕文字 */
  text-shadow: 1px 1px 0 #fff; /* 白色描边，仿老式像素文字 */
  letter-spacing: 2px; /* 字间距拉大，复古感 */
  /* 可选：加一点点闪烁动画，仿老式CRT屏幕 */
  animation: flicker 1.5s infinite alternate;
}

/* 复古闪烁动画（可选，模拟老式屏幕频闪） */
@keyframes flicker {
  0% { opacity: 1; }
  100% { opacity: 0.95; }
}

/* 适配你的页面整体风格，和背景色呼应 */
@media (max-width: 1350px) {
  .loading-tip {
    padding: 12px 24px;
    font-size: 14px;
  }
}
</style>