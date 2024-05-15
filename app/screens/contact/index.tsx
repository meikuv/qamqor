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
          <Text style={{ color: '#0f5645' }} className="text-lg font-medium">
            {t('contact.phoneNumber')}
          </Text>
          <Text
            onPress={() => Linking.openURL('tel:+77788310227')}
            style={{ color: '#0f5645' }}
            className="text-sm"
          >
            +77788310227
          </Text>
        </View>
        <View className="p-4">
          <Text style={{ color: '#0f5645' }} className="text-lg font-medium">
            {t('contact.email')}
          </Text>
          <Text
            onPress={() => Linking.openURL('mailto:meirzhankulmanov01@gmail.com')}
            style={{ color: '#0f5645' }}
            className="text-sm"
          >
            meirzhankulmanov01@gmail.com
          </Text>
        </View>
      </View>
    </DefaultLayout>
  )
}

export default ContactUs
