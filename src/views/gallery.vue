<template>
  <div class="header-section">
    <h1
      style="
        font-size: 24px;
        color: #333;
        border-bottom: 2px dashed #79acc5;
        padding-bottom: 10px;
      "
    >
      ◆ Gallery / 画廊 ◆
    </h1>
    <p style="font-size: 13px; color: #555; margin-top: 10px">
      ★ 这里的画作都是收到的礼物或心血之作，请勿随意带走哦 ★
    </p>
  </div>
  <div class="gallery-grid">
    <!-- 循环渲染所有画廊项，使用唯一id作为key -->
    <div 
      class="gallery-item" 
      v-for="(item, index) in galleryItems" 
      :key="index"
    >
      <a :href="item.link" target="_blank">
        <img :src="item.imageSrc" :alt="item.alt || item.artistName" />
      </a>
      <p>
        <span class="artist">
          绘者：<a :href="item.artistLink" class="artist-link">{{ item.artistName }}</a>
        </span>
        <br />{{ item.date }}
      </p>
    </div>
  </div>
  <div
    style="text-align: center; margin-top: 40px; font-size: 13px; color: #888"
  >
    <p>更多精彩作品正在收集整理中……</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义响应式的画廊数据数组（组合式核心：数据和逻辑内聚）
const galleryItems = ref([
  {
    link: 'https://www.bilibili.com/video/BV1mg6nBqExS/',
    imageSrc: '/img/ゆるん.png',
    alt: 'ゆるん',
    artistName: 'ゆるん',
    artistLink: 'https://space.bilibili.com/1917175144',
    date: '2003/01/31'
  },
  {
    link: 'https://www.bilibili.com/video/BV1MC6zBZEML/',
    imageSrc: '/img/失去梦想的奇奇-Traum奇1.jpg',
    artistName: '失去梦想的奇奇-Traum奇',
    artistLink: '#',
    date: '2003/1/31'
  },
  {
    link: 'https://www.bilibili.com/video/BV1MC6zBZEML/',
    imageSrc: '/img/失去梦想的奇奇-Traum奇2.jpg',
    artistName: '失去梦想的奇奇-Traum奇',
    artistLink: '#',
    date: '2003/1/31'
  },
  {
    link: 'https://www.bilibili.com/video/BV1MC6zBZEML/',
    imageSrc: '/img/失去梦想的奇奇-Traum奇3.jpg',
    artistName: '失去梦想的奇奇-Traum奇',
    artistLink: '#',
    date: '2003/1/31'
  },
  {
    link: 'https://www.bilibili.com/video/BV1HVz9BDELM/',
    imageSrc: '/img/芸草冰2.jpg',
    artistName: '芸草冰',
    artistLink: '#',
    date: '2003/01/28'
  },
  {
    link: 'https://www.bilibili.com/video/BV16q64BVE7E/',
    imageSrc: '/img/M-Ronan.jpg',
    artistName: 'M-Ronan',
    artistLink: '#',
    date: '2003/02/01'
  },
  {
    link: 'https://qijiujiujiujiu401.lofter.com/',
    imageSrc: '/img/软毛咩姆酱.jpg',
    artistName: '软毛咩姆酱',
    artistLink: '#',
    date: '2003/01/28'
  },
  {
    link: 'https://www.bilibili.com/video/BV1HVz9BDELM/',
    imageSrc: '/img/芸草冰1.jpg',
    artistName: '芸草冰',
    artistLink: '#',
    date: '2003/01/28'
  },
  {
    link: 'https://www.bilibili.com/video/BV1HVz9BDELM/',
    imageSrc: '/img/芸草冰3.jpg',
    artistName: '芸草冰',
    artistLink: '#',
    date: '2003/01/28'
  },
  {
    link: 'https://milktea-tk.lofter.com/',
    imageSrc: '/img/MILKTEA.jpg',
    artistName: 'MILKTEA',
    artistLink: '#',
    date: '2003/01/30'
  },
  {
    link: 'https://www.bilibili.com/video/BV1MG6CBvEJB/',
    imageSrc: '/img/夜间限定炸猪排盖饭.jpg',
    artistName: '夜间限定炸猪排盖饭',
    artistLink: '#',
    date: '2003/01/31'
  }
])
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.gallery-item {
  border: 2px solid #fff;
  padding: 5px;
  background-color: #f0f8ff;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease-in-out;
  height: fit-content;
}

.gallery-item:hover {
  border-color: #79acc5;
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  background-color: #fff;
}

.gallery-item p {
  margin: 8px 0 3px;
  font-size: 12px;
  text-align: center;
  color: #666;
  line-height: 1.4;
}

.gallery-item .artist {
  font-weight: bold;
  color: #333;
}

.artist-link {
  color: inherit;
  text-decoration: none;
}
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
  text-align: center;
}

</style>
