import React, { FC, useState } from 'react'
import { View, Text, Pressable, ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../../hooks/useAssistance'
import { IAssistance } from '../../../services/assistance.service'
import { useNavigation } from '@react-navigation/native'
import DefaultLayout from '../../../components/layout/DefaultLayout'

const VolunteerList: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { volunteerList, getAllVolunteer } = useAssistance()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getAllVolunteer()
    } finally {
      setRefreshing(false)
    }
  }

  const VolunteerItem: FC<{ volunteer: IAssistance }> = ({ volunteer }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Assistance', { assistance: volunteer, imageIndex: 1 })}
        style={{ backgroundColor: '#FFFFE0' }}
        className="w-full h-max mb-2 bg-white p-2 rounded-xl shadow-xl shadow-gray-600"
      >
        <View className="flex-row w-full h-max items-center">
          <ImageBackground
            source={{ uri: volunteer.photoUrl }}
            resizeMode="cover"
            style={{ width: 55, height: 55 }}
            imageStyle={{ borderRadius: 25 }}
          />
          <View className="flex-1 text-center ml-4">
            <Text style={{ color: '#0f5645' }} className="text-base font-medium">
              {volunteer.name}
            </Text>
            {volunteer.contact.email && (
              <Text style={{ color: '#0f5645' }} className="text-xs">
                {volunteer.contact.email}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <DefaultLayout
      isScrollView={true}
      bgColor="bg-white"
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <View className="w-full pt-2 px-4">
        {volunteerList?.length !== 0 &&
          volunteerList?.map((volunteer) => (
            <VolunteerItem key={volunteer.id} volunteer={volunteer} />
          ))}
      </View>
    </DefaultLayout>
  )
}

export default VolunteerList
