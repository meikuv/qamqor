import React, { createContext, useState, useEffect } from 'react'
import i18next from 'i18next'
import i18n from '../../locales'
import langService from '../../services/lang.service'

export interface I18nContextType {
  setLocale: (locale: string) => Promise<void>
  locale: string | null | undefined
}

export const I18nContext = createContext<I18nContextType>({
  setLocale: async () => {},
  locale: null,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string | null>()

  const updateLocale = async (locale: string) => {
    await langService.setLanguageCode(locale)
    i18next.changeLanguage(locale)
    setLocale(locale)
  }

  useEffect(() => {
    if (locale) return
    const loadLocales = async () => {
      const storedLocale = await langService.getLanguageCode()
      if (storedLocale) {
        setLocale(storedLocale)
      } else {
        const locale = 'ru'
        setLocale(locale)
      }
    }
    loadLocales()
  }, [locale])

  useEffect(() => {
    if (!locale) return

    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <I18nContext.Provider
      value={{
        setLocale: updateLocale,
        locale,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
