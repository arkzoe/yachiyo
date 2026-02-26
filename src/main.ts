//引入createApp用于创建应用实例，App.vue是根组件
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'
// @ts-ignore
import LoadingPage from './components/LoadingPage.vue'
createApp(App)
  .use(createPinia())
  .use(router)
  .component('LoadingPage', LoadingPage)
  .mount('#app')
