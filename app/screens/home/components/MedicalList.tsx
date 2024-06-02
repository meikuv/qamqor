import React, { FC, useState } from 'react'
import { View, Text, Image, Pressable, Linking } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../../hooks/useAssistance'
import { useI18n } from '../../../hooks/useI18n'
import { IMedical } from '../../../services/assistance.service'
import DefaultLayout from '../../../components/layout/DefaultLayout'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export interface IMedicalProps {
  medical: IMedical
}

const MedicalList = () => {
  const { t } = useTranslation()
  const { locale } = useI18n()
  const { medicalList, getAllMedical } = useAssistance()
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getAllMedical()
    } finally {
      setRefreshing(false)
    }
  }

  const MedicalItem: FC<IMedicalProps> = ({ medical }) => {
    return (
      <Pressable
        onPress={() => Linking.openURL(medical.websiteUrl)}
        style={{ backgroundColor: '#FFFFE0' }}
        className={`mb-2 bg-white p-2 rounded-xl shadow-sm shadow-black my-2`}
      >
        <View className="flex-col">
          <View className="flex-row items-center">
            <Image
              source={{ uri: medical?.photoUrl }}
              className="h-24 w-24 rounded-full"
              resizeMode="contain"
            />
            <View className="flex-1 ml-4">
              <Text style={{ color: '#0f5645' }} className="flex flex-shrink text-sm font-semibold">
                {medical?.name}
              </Text>
              <Pressable
                onPress={() => Linking.openURL(`tel:${medical?.phone}`)}
                className="flex-row items-center mt-1"
              >
                <Icon name="phone" size={18} color="#0f5645" />
                <Text style={{ color: '#0f5645' }} className="text-center ml-1">
                  {medical?.phone}
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="mt-2">
            <Text style={{ color: '#0f5645' }} className="text-sm font-bold">
              {t('law.lawyer.direct')}:{' '}
            </Text>
            <Text style={{ color: '#0f5645' }} className="text-xs">
              {locale === 'ru' ? medical?.descriptionRU : medical?.descriptionKZ}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <DefaultLayout isScrollView={true} refreshing={refreshing} onRefresh={onRefresh}>
      <View className="mx-4">
        {medicalList?.length !== 0 &&
          medicalList?.map((medical) => <MedicalItem key={medical.id} medical={medical} />)}
      </View>
    </DefaultLayout>
  )
}

export default MedicalList
