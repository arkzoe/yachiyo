import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 获取本地存储的语言，默认中文
const getDefaultLang = () => {
  return localStorage.getItem('lang') || 'zh'
}

// v11版本：移除 legacy: false，其余不变
const i18n = createI18n({
  locale: getDefaultLang(), // 默认语言
  fallbackLocale: 'zh',     // 语言缺失时兜底
  messages: {
    zh,
    en
  }
})

export default i18n