import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'

const Empty = () => {
  const { t } = useTranslation()

  return (
    <View className="text-center">
      <Text>{t('empty.title')}</Text>
    </View>
  )
}

export default Empty
