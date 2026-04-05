<template>
  <aside class="sidebar">
    <div class="menu-header">
      {{ t('common.menuheader') }}<br />
      - MENU -
    </div>

    <ul class="menu-list">
      <li v-for="(menu, index) in menuList" :key="index">
        <span class="menu-icon">◆</span>
        <router-link :to="menu.path" :style="menu.linkStyle">
          {{ menu.label }}
        </router-link>
        <span v-if="menu.appendText">{{ menu.appendText }}</span>
        <span class="new-tag" v-if="menu.showNewTag">New</span>
        <a v-if="menu.extraLink" :href="menu.extraLink.href" :style="menu.extraLink.style">
          {{ menu.extraLink.text }}
        </a>
      </li>
    </ul>

    <div class="link-info">
      {{ t('common.linkinfo.line1') }}<br />
      {{ t('common.linkinfo.line2') }}<br />
      {{ t('common.linkinfo.line3') }}<br />
      <strong>{{ t('common.linkinfo.line4') }}</strong>
    </div>

    <div class="banner-area">
      <router-link to="/">
        <img src="/images/banner_jp.gif" alt="八千代的小屋 Banner" class="banner-img" />
      </router-link>
    </div>

    <div class="lang">
      lang:
      <a
        href="#"
        :class="{ active: locale === 'zh' }"
        @click.prevent="locale = 'zh'"
      >
        ZH
      </a>
      <a
        href="#"
        :class="{ active: locale === 'ja' }"
        @click.prevent="locale = 'ja'"
      >
        JA
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// 在 setup 中调用 useI18n 获取 t 函数
const { t ,locale} = useI18n()

// 菜单列表改为计算属性，确保翻译响应式
const menuList = computed(() => [
  {
    path: '/',
    label: t('common.top'),
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/profile',
    label: t('common.profile'),
    appendText: t('common.profileappend'),
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/gallery',
    label: t('common.gallery'),
    appendText: '',
    showNewTag: true,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/bbs',
    label: t('common.bbs'),
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/etcha',
    label: t('common.etcha'),
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: {
      href: '/etcha-rules',
      style: { fontSize: '13px', color: '#666' },
      text: t('common.etcharules')
    }
  },
  {
    path: '/music',
    label: t('common.music'),
    appendText: '',
    showNewTag: true,
    linkStyle: {},
    extraLink: null
  },
  {
    path: '/game',
    label: t('common.game'),
    appendText: t('common.gameappend'),
    showNewTag: false,
    linkStyle: { color: '#000', cursor: 'default', textDecoration: 'line-through' },
    extraLink: null
  },
  {
    path: '/links',
    label: t('common.links'),
    appendText: '',
    showNewTag: false,
    linkStyle: {},
    extraLink: null
  }
])
</script>

<style scoped>
.lang { margin: 10px 0; }
.lang a {
  margin-left: 10px;
}
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
