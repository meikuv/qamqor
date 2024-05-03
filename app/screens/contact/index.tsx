import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Linking } from 'react-native'
import DefaultLayout from '../../components/layout/DefaultLayout'

const ContactUs: FC = () => {
  const { t } = useTranslation()

  return (
    <DefaultLayout bgColor="bg-white">
      <View className="divide-y divide-gray-100">
        <View className="p-4">
          <Text className="text-lg font-medium">{t('contact.phoneNumber')}</Text>
          <Text
            onPress={() => Linking.openURL('tel:+77788310227')}
            className="text-sm text-sky-600"
          >
            +77788310227
          </Text>
        </View>
        <View className="p-4">
          <Text className="text-lg font-medium">{t('contact.email')}</Text>
          <Text
            onPress={() => Linking.openURL('mailto:meirzhankulmanov01@gmail.com')}
            className="text-sm text-sky-600"
          >
            meirzhankulmanov01@gmail.com
          </Text>
        </View>
      </View>
    </DefaultLayout>
  )
}

export default ContactUs
