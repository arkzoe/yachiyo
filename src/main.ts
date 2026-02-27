//引入createApp用于创建应用实例，App.vue是根组件
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'
import i18n from './lang'
// @ts-ignore
import LoadingPage from './components/LoadingPage.vue'
createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .component('LoadingPage', LoadingPage)
  .mount('#app')
