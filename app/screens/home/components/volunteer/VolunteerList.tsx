import React, { FC } from 'react'
import { View, Text, Pressable, ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../../../hooks/useAssistance'
import { IAssistance } from '../../../../services/assistance.service'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import { useNavigation } from '@react-navigation/native'

const VolunteerList: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { volunteerList } = useAssistance()

  const VolunteerItem: FC<{ volunteer: IAssistance }> = ({ volunteer }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Volunteer', { volunteer })}
        className="w-full h-max mb-2 bg-white p-2 rounded-xl shadow-xl shadow-gray-400"
      >
        <View className="flex-row w-full h-max items-center">
          <ImageBackground
            source={{ uri: volunteer.photoUrl }}
            resizeMode="cover"
            style={{ width: 55, height: 55 }}
            imageStyle={{ borderRadius: 25 }}
          />
          <View className="flex-1 text-center ml-4">
            <Text className="text-black text-base font-medium">{volunteer.name}</Text>
            {volunteer.contact.email && (
              <Text className="text-xs text-gray-500">{volunteer.contact.email}</Text>
            )}
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
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
