import { createRouter, createWebHistory } from 'vue-router'
import { useLoadingStore } from '@/store/loading'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
      meta: { title: "八千代的小屋 - Yachiyo's Room" }
    },
    {
      path: '/bbs',
      name: 'bbs',
      component: () => import('@/views/bbs.vue'),
      meta: { title: "お絵描きBBS - 八千代的小屋" }
    },
    {
      path: '/oekaki',
      name: 'oekaki',
      component: () => import('@/views/oekaki.vue'),
      meta: { title: "お絵かきBBS - 八千代的小屋" }
    },
    {
      path: '/etcha',
      name: 'etcha',
      // @ts-ignore
      component: () => import('@/views/etcha.vue'),
      meta: { title: "绘茶 - 绘图板" }
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('@/views/music.vue'),
      meta: { title: "音乐播放处 - 八千代的小屋" }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/gallery.vue'),
      meta: { title: "画廊 - 八千代的小屋" }
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('@/views/links.vue'),
      meta: { title: "友情链接 - 八千代的宇宙空间站" }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile.vue'),
      meta: { title: "个人档案 - 100问100答" }
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/game.vue'),
      meta: { title: "游戏角(施工中) - 八千代的小屋" }
    },
    {
      path: '/etcha-rules',
      name: 'etcha-rules',
      component: () => import('@/views/etcha-rules.vue'),
      meta: { title: "絵茶利用規約 - 八千代的小屋" }
    },
    {
      path: '/webclap',
      name: 'webclap',
      component: () => import('@/views/webclap.vue'),
      meta: { title: "Web拍手・心を残す - 八千代的小屋" }
    },
    {
      path: '/etcha-schedule',
      name: 'etcha-schedule',
      component: () => import('@/views/etcha-schedule.vue'),
      meta: { title: "合同絵茶 開催予定 - 八千代的小屋" }
    },
    {
      path: '/omelet-alliance',
      name: 'omelet-alliance',
      component: () => import('@/views/omelet-alliance.vue'),
      meta: { title: "オムライス愛好同盟 - 八千代的小屋" }
    },
    {
      path: '/mentako-alliance',
      name: 'mentako-alliance',
      component: () => import('@/views/mentako-alliance.vue'),
      meta: { title: "メンタコ同盟 - 八千代的小屋" }
    },
    {
      path: '/moon-alliance',
      name: 'moon-alliance',
      component: () => import('@/views/moon-alliance.vue'),
      meta: { title: "月に帰りたくなる同盟 - 八千代的小屋" }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = String(to.meta.title);
  } else {
    document.title = '我的Vue项目';
  }
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()
  next()
})

// 延长延迟到 500ms，适配懒加载组件下载
router.afterEach(() => {
  const loadingStore = useLoadingStore()
  setTimeout(() => {
    loadingStore.stopLoading()
  }, 500) 
})

router.onError(() => {
  const loadingStore = useLoadingStore()
  loadingStore.stopLoading()
})

export default router