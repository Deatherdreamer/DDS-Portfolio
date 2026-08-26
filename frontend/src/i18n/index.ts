import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'

export const supportedLocales = ['en', 'es'] as const
export type Locale = (typeof supportedLocales)[number]
export const defaultLocale: Locale = 'en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    supportedLngs: supportedLocales,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
