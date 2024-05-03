import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Pressable, ImageBackground, FlatList, RefreshControl } from 'react-native'
import { useAssistance } from '../../../../hooks/useAssistance'
import { IAssistance } from '../../../../services/assistance.service'
import { useNavigation } from '@react-navigation/native'
import DefaultLayout from '../../../../components/layout/DefaultLayout'

const CharityList: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { charityList } = useAssistance()

  const charityListByType: { [key: string]: IAssistance[] } = {}
  charityList?.forEach((charity) => {
    if (!charityListByType[charity.typeKZ]) {
      charityListByType[charity.typeKZ] = []
    }
    charityListByType[charity.typeKZ].push(charity)
  })

  const CharityItem: FC<{ charity: IAssistance }> = ({ charity }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Charity', { charity })}
        className="w-full h-max mb-2 bg-white p-2 rounded-xl shadow-xl shadow-gray-400"
      >
        <View className="flex-row w-full h-max items-center">
          <ImageBackground
            source={{ uri: charity.photoUrl }}
            resizeMode="cover"
            style={{ width: 55, height: 55 }}
            imageStyle={{ borderRadius: 25 }}
          />
          <View className="flex-1 text-center ml-4">
            <Text className="text-black text-base font-medium">{charity.name}</Text>
            {charity.contact.email && (
              <Text className="text-xs text-gray-500">{charity.contact.email}</Text>
            )}
          </View>
        </View>
      </Pressable>
    )
  }

  const ListHeader: FC<{ type: string; count: number }> = ({ type, count }) => {
    return <Text className="text-black font-bold text-xl mb-2">{type}</Text>
  }

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
      {Object.keys(charityListByType).map((type) => (
        <View className="w-full pt-2 px-4">
          <ListHeader type={type} count={charityListByType[type].length} />
          {charityListByType[type].map((charity) => (
            <CharityItem key={charity.id} charity={charity} />
          ))}
        </View>
      ))}
    </DefaultLayout>
  )
}

export default CharityList
