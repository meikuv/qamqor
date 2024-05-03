import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import kk from '../locales/kk-KK.json'
import ru from '../locales/ru-RU.json'

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    kk,
    ru,
  },
  lng: 'ru',
  fallbackLng: 'kk',
})

export default i18next
