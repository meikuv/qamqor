import React, { useState } from 'react'
import { View, Text } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useI18n } from '../../../hooks/useI18n'
import { useTranslation } from 'react-i18next'

const General = () => {
  const { t } = useTranslation()
  const { locale, setLocale } = useI18n()
  const [language, setLanguage] = useState<string | null | undefined>(locale)
  const fields = [
    { key: 'ru', title: 'Русский' },
    { key: 'kk', title: 'Қазақша' },
  ]

  const localeChangeHandler = async (langCode: string) => {
    setLanguage(langCode)
    await setLocale(langCode)
  }

  return (
    <View className="divide-y divide-gray-100">
      <View className="p-5">
        <Text className="text-xl font-bold">{t('settings.appLang')}</Text>
        {fields.map((field) => (
          <View key={field.key} className="py-3 px-2 flex-row justify-between">
            <Text className="text-base">{field.title}</Text>
            <BouncyCheckbox
              fillColor="rgb(2, 132, 199)"
              isChecked={language === field.key}
              onPress={() => {
                localeChangeHandler(field.key)
              }}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

export default General
