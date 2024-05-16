import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Linking } from 'react-native'
import DefaultLayout from '../../components/layout/DefaultLayout'
import SafeLayout from '../../components/layout/SafeLayout'
import WebView from 'react-native-webview'

const Support: FC = () => {
  const { t } = useTranslation()

  return (
    <SafeLayout>
      <View className="divide-y-2 divide-gray-200">
        <View className="p-4">
          <Text style={{ color: '#0f5645' }} className="text-lg font-medium">
            {t('contact.phoneNumber')}
          </Text>
          <Text
            onPress={() => Linking.openURL('tel:+77082198508')}
            style={{ color: '#0f5645' }}
            className="text-sm"
          >
            +77082198508
          </Text>
          <Text
            onPress={() => Linking.openURL('tel:+77003838900')}
            style={{ color: '#0f5645' }}
            className="text-sm"
          >
            +77003838900
          </Text>
        </View>
        <View className="p-4">
          <Text style={{ color: '#0f5645' }} className="text-lg font-medium">
            Телеграм канал
          </Text>
          <Text
            onPress={() => Linking.openURL('https://t.me/qamqor_almaty')}
            style={{ color: '#0f5645' }}
            className="text-sm"
          >
            https://t.me/qamqor_almaty
          </Text>
        </View>
      </View>
    </SafeLayout>
  )
}

export default Support
