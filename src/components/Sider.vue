<template>
  <aside class="sidebar">
    <div class="menu-header">
      八千代的小屋<br />
      - MENU -
    </div>
    <ul class="menu-list">
    <!-- 循环渲染所有菜单项，使用唯一id作为key -->
    <li v-for="(menu, index) in menuList" :key="index">
      <span class="menu-icon">◆</span>
      <!-- 动态渲染路由链接 -->
      <router-link
        :to="menu.path"
        :style="menu.linkStyle"
      >
        {{ menu.label }}
      </router-link>
      <!-- 渲染链接后的附加文本 -->
      <span v-if="menu.appendText">{{ menu.appendText }}</span>
      <!-- 渲染New标签 -->
      <span class="new-tag" v-if="menu.showNewTag">New</span>
      <!-- 渲染额外的链接（如利用规约） -->
      <a
        v-if="menu.extraLink"
        :href="menu.extraLink.href"
        :style="menu.extraLink.style"
      >
        {{ menu.extraLink.text }}
      </a>
    </li>
  </ul>

    <div class="link-info">
      本站链接自由。<br />
      也大欢迎交换链接☆<br />
      Banner 请保存后使用<br />
      <strong>※严禁盗链※</strong>
    </div>

    <div class="banner-area">
      <router-link to="/">
        <img
          src="/images/banner_jp.gif"
          alt="八千代的小屋 Banner"
          class="banner-img"
        />
      </router-link>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const menuList = ref([
  {
    path: '/',
    label: 'TOP / 首页',
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/profile',
    label: '自我介绍',
    appendText: ' ― 100问100答',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/gallery',
    label: '画廊',
    appendText: '',
    showNewTag: true, // 显示New标签
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/bbs',
    label: '绘图板 / BBS',
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/etcha',
    label: '绘茶',
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: { // 附加的利用规约链接
      href: '/etcha-rules',
      style: { fontSize: '13px', color: '#666' },
      text: '※利用规约 ←必读'
    }
  },
  {
    path: '/music',
    label: '音乐室',
    appendText: '',
    showNewTag: true, // 显示New标签
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/game',
    label: '游戏角',
    appendText: '施工中',
    showNewTag: false,
    // 游戏角链接的样式（失效、删除线）
    linkStyle: { color: '#000', cursor: 'default', textDecoration: 'line-through' },
    extraLink: null
  },
  {
    path: '/links',
    label: '友链合集',
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  }
])
</script>
<style scoped>
.banner-area {
  margin-top: 10px;
  text-align: center;
}
.banner-img {
  border: 2px solid #cc9966;
  display: block;
}
.link-info {
  font-size: 15px;
  color: #222;
  font-weight: bold;
  margin-top: 10px;
  line-height: 1.4;
  letter-spacing: -0.5px;
}
.sidebar {
  width: 290px;
  flex-shrink: 0;
  background-color: #fdfac8;
  background-image: url("/images/bg_yellow.jpg");
  background-repeat: repeat;
  padding: 20px;
  border-right: 1px solid #808080;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
}

.menu-header {
  font-weight: bold;
  font-size: 19px;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 2px dotted #cc9966;
  padding-bottom: 5px;
  text-align: center;
  background-color: rgba(255,255,255,0.3);
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-list li {
  margin-bottom: 12px;
  padding-left: 5px;
}

.menu-list a {
  color: #0000cd;
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
}
.menu-list a:hover {
  color: #ff6600;
}

.menu-icon {
  color: #d26432;
  font-size: 18px;
  vertical-align: middle;
  margin-right: 3px;
}
.new-tag {
  color: red;
  font-size: 12px;
  font-weight: bold;
  vertical-align: top;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
