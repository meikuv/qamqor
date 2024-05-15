import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'

const Empty = () => {
  const { t } = useTranslation()

  return (
    <View className="text-center">
      <Text style={{ color: '#0f5645' }}>{t('empty.title')}</Text>
    </View>
  )
}

export default Empty
