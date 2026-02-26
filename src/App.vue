<template>
  <div class="container">
    <Sider></Sider>
    <main class="main-content">
      <!-- 移除这里的 LoadingPage，改为全局挂载 -->
      <router-view v-if="!isLoading" />
    </main>
    <!-- 全局加载组件，放在 container 外，避免样式影响 -->
    <LoadingPage />
  </div>
</template>

<script setup lang="ts">
import Sider from "./components/Sider.vue";
import { useLoadingStore } from '@/store/loading'
import LoadingPage from './components/LoadingPage.vue' // 移除 @ts-ignore

// 关键：确保状态是响应式的（Pinia 解构后需用 storeToRefs）
import { storeToRefs } from 'pinia' 
const loadingStore = useLoadingStore()
// 用 storeToRefs 解构，保留响应式（核心修复点）
const { isLoading } = storeToRefs(loadingStore)
</script>

<style>
* {
  cursor: url("/images/take_cusor.png"), auto !important;
}

body {
  margin: 0;
  padding: 0;
  background-color: #79acc5;
  font-family: "Gulim", "굴림", "Dotum", "돋움", sans-serif;
  font-size: 15.5px;
  color: #444;
  line-height: 1.5;
  overflow-x: auto;
}
.container {
  width: 100%;
  min-width: 1350px;
  display: flex;
  min-height: 100vh;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  box-sizing: border-box;
}
.main-content {
  position: relative;
  flex: 1;
  padding: 30px 40px;
  background-color: #d0f0f5;
  background-image: url("/images/bg_blue.png");
  background-repeat: repeat;
  border-left: 7px solid #d3d3d3;
  box-shadow: inset 2px 0 0 #808080;
}
</style>