import React, { FC, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  ScrollView,
  RefreshControl,
  LayoutChangeEvent,
} from 'react-native'
import { useAssistance } from '../../../hooks/useAssistance'
import { useI18n } from '../../../hooks/useI18n'
import { useTranslation } from 'react-i18next'
import { ILawyer } from '../../../services/assistance.service'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DefaultLayout from '../../../components/layout/DefaultLayout'

interface ILawyerProps {
  lawyer?: ILawyer
  scrollToIndex?: number
}

const Lawyers: FC<ILawyerProps> = ({ scrollToIndex }) => {
  const { t } = useTranslation()
  const { locale } = useI18n()
  const { lawyerList, getAllLawyer } = useAssistance()
  const ref = useRef<ScrollView>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getAllLawyer()
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (scrollToIndex) {
      const itemPosition = scrollToIndex * 172
      ref?.current?.scrollTo({ x: 0, y: itemPosition, animated: true })
    }
  }, [scrollToIndex])

  const Lawyer: FC<ILawyerProps> = ({ lawyer }) => {
    return (
      <View className="flex h-max bg-white rounded-xl shadow-xl shadow-gray-400 m-2 px-4 py-2">
        <View className="flex-1 flex-col">
          <View className="flex-1 flex-row items-center">
            <Image source={{ uri: lawyer?.photoUrl }} className="h-24 w-24 rounded-full" />
            <View className="ml-10">
              <Text className="text-lg font-semibold">{lawyer?.name}</Text>
              <Text className="text-sm font-medium">
                {t('law.lawyer.workExp')}: {lawyer?.workExperience} {t('law.lawyer.year')}
              </Text>
              <Pressable
                onPress={() => Linking.openURL(`tel:${lawyer?.contact.phone}`)}
                className="flex-row items-center mt-1"
              >
                <Icon name="phone" size={18} color="rgb(2 132 199)" />
                <Text className="text-center text-sky-700"> {lawyer?.contact.phone}</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  Linking.openURL(`https://www.instagram.com/${lawyer?.contact.instagram}/`)
                }
                className="flex-row items-center"
              >
                <Icon name="instagram" size={18} color="rgb(2 132 199)" />
                <Text className="text-center text-sky-700"> @{lawyer?.contact.instagram}</Text>
              </Pressable>
            </View>
          </View>
          <View className="mt-2">
            <Text className="text-sm font-bold">{t('law.lawyer.direct')}: </Text>
            <Text className="text-xs">{locale === 'ru' ? lawyer?.directRU : lawyer?.directKZ}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <DefaultLayout isScrollView={false} bgColor="bg-white">
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {lawyerList?.length !== 0 &&
          lawyerList?.map((lawyer) => <Lawyer key={lawyer.id} lawyer={lawyer} />)}
      </ScrollView>
    </DefaultLayout>
  )
}

export default Lawyers
