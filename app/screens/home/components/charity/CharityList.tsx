import React, { FC, useEffect, useState } from 'react'
import { View, Text, Pressable, ImageBackground, RefreshControl } from 'react-native'
import { useAssistance } from '../../../../hooks/useAssistance'
import { IAssistance } from '../../../../services/assistance.service'
import { useNavigation } from '@react-navigation/native'
import { useI18n } from '../../../../hooks/useI18n'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import IconButton from '../../../../components/ui/IconButton'

const CharityList: FC = () => {
  const navigation = useNavigation()
  const { charityList, getAllCharity } = useAssistance()
  const { locale } = useI18n()
  const [typeKey, setTypeKey] = useState<any>(locale)
  const [charityListByType, setCharityListByType] = useState<{ [key: string]: IAssistance[] }>({})
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({})
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getAllCharity()
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    setTypeKey(locale)
  }, [locale])

  useEffect(() => {
    const updatedCharityListByType: { [key: string]: IAssistance[] } = {}
    charityList?.forEach((charity) => {
      const key = typeKey === 'kk' ? charity.typeKZ : charity.typeRU
      if (!updatedCharityListByType[key]) {
        updatedCharityListByType[key] = []
      }
      updatedCharityListByType[key].push(charity)
    })
    setCharityListByType(updatedCharityListByType)
  }, [locale, charityList, typeKey])

  const toggleCollapse = (type: string) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }))
  }

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
    return (
      <View className="flex-row justify-between">
        <Text className="text-black font-bold text-xl mb-2">{type}</Text>
        <IconButton
          name={collapsed[type] ? 'chevron-down' : 'chevron-up'}
          size={25}
          color="black"
          onPress={() => toggleCollapse(type)}
        />
      </View>
    )
  }

  return (
    <DefaultLayout
      isScrollView={true}
      bgColor="bg-white"
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      {Object.keys(charityListByType).map((type) => (
        <View className="w-full pt-2 px-4" key={type}>
          <ListHeader type={type} count={charityListByType[type].length} />
          {!collapsed[type] &&
            charityListByType[type].map((charity) => (
              <CharityItem key={charity.id} charity={charity} />
            ))}
        </View>
      ))}
    </DefaultLayout>
  )
}

export default CharityList
