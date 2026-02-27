import { createI18n } from 'vue-i18n';
import ja from '@/lang/ja';
import zh from '@/lang/zh';


const i18n = createI18n<[any], 'ja' | 'zh'>({
  locale: 'zh',
  fallbackLocale: 'ja',
  messages:{
     ja,
     zh,
  }
});

export default i18n;