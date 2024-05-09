import React, { FC, useState } from 'react'
import { View, Text, Image, ScrollView, Pressable, Linking } from 'react-native'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import { IAssistance } from '../../../../services/assistance.service'
import DebitCard from '../../../../components/DebitCard'
import IconButton from '../../../../components/ui/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { useI18n } from '../../../../hooks/useI18n'

interface ICharityProps {
  route: {
    params: {
      charity: IAssistance
    }
  }
}

const Charity: FC<ICharityProps> = ({ route }) => {
  const { charity } = route.params
  const { t } = useTranslation()
  const { locale } = useI18n()
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
      <View className="flex-1">
        <View className="h-32 overflow-hidden">
          <Image
            source={require('../../../../../assets/hands.jpg')}
            className="w-full h-full rounded-b-xl"
            resizeMode="cover"
          />
        </View>
        <View className="flex justify-center items-center -mt-14">
          <View className="bg-white p-2 rounded-full">
            <Image source={{ uri: charity.photoUrl }} className="h-32 w-32 bg-white rounded-full" />
          </View>
        </View>
        <View className="my-2">
          <View className="items-center mx-5">
            <Text className="text-center text-2xl font-medium">{charity.name}</Text>
          </View>
          <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 mt-2 p-4">
            <Text className="text-base font-medium">{t('charity.about')}</Text>
            <Text className="text-xs mt-1">
              {locale === 'ru' ? charity.descriptionRU : charity.descriptionKZ}
            </Text>
          </View>
          {charity.directions.length !== 0 && (
            <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 p-4">
              <Text className="text-base font-medium mb-1">{t('charity.direct')}</Text>
              {charity.directions.map((direction) => (
                <Text key={direction.id} className="text-xs">{`\u2023 ${locale === 'ru' ? direction.titleRU : direction.titleKZ}`}</Text>
              ))}
            </View>
          )}
          {charity.requisites.length !== 0 && (
            <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 py-4 pl-4">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {charity.requisites.map((requisite) => (
                  <DebitCard key={requisite.id} debitCardProps={requisite} />
                ))}
              </ScrollView>
            </View>
          )}
          {charity.locations.length !== 0 && (
            <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 p-4">
              <View className="flex-row justify-between">
                <Text className="text-base font-medium mb-1">{t('charity.address')}</Text>
                <IconButton
                  name={!collapsed ? 'chevron-down' : 'chevron-up'}
                  size={25}
                  color="black"
                  onPress={toggleCollapsed}
                />
              </View>
              {collapsed &&
                charity.locations.map((location) => (
                  <View
                    key={location.id}
                    className="h-max bg-white rounded-xl shadow-md shadow-gray-400 p-2 mt-2"
                  >
                    {location.name && (
                      <View className="flex-row items-center mb-1">
                        <Icon name="office-building" size={15} style={{ marginRight: 10 }} />
                        <Text className="flex-1 text-xs">{location.name}</Text>
                      </View>
                    )}
                    {location.email && (
                      <Pressable
                        className="flex-row items-center mb-1"
                        onPress={() => Linking.openURL(`mailto:${location.email}`)}
                      >
                        <Icon name="email" size={15} style={{ marginRight: 10 }} />
                        <Text className="flex-1 text-xs text-sky-600">{location.email}</Text>
                      </Pressable>
                    )}
                    {location.phone && (
                      <Pressable
                        className="flex-row items-center mb-1"
                        onPress={() => Linking.openURL(`tel:${location.phone}`)}
                      >
                        <Icon name="phone" size={15} style={{ marginRight: 10 }} />
                        <Text className="flex-1 text-xs text-sky-600">{location.phone}</Text>
                      </Pressable>
                    )}
                    {location.location && (
                      <View className="flex-row items-center mb-1">
                        <Icon name="map-marker" size={15} style={{ marginRight: 10 }} />
                        <Text className="flex-1 text-xs">{location.location}</Text>
                      </View>
                    )}
                  </View>
                ))}
            </View>
          )}
          {charity.phoneNumbers.length !== 0 && (
            <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 p-4">
              <Text className="text-base font-medium mb-1">{t('charity.phone')}</Text>
              {charity.phoneNumbers.map((phone) => (
                <View
                  key={phone.id}
                  className="h-max bg-white rounded-xl shadow-md shadow-gray-400 p-2 mt-2"
                >
                  {phone.personName && (
                    <View className="flex-row items-center mb-1">
                      <Icon name="account" size={15} style={{ marginRight: 10 }} />
                      <Text className="flex-1 text-xs">{phone.personName}</Text>
                    </View>
                  )}
                  {phone.phoneNumber && (
                    <Pressable
                      className="flex-row items-center"
                      onPress={() => Linking.openURL(`tel:${phone.phoneNumber}`)}
                    >
                      <Icon name="phone" size={15} style={{ marginRight: 10 }} />
                      <Text className="flex-1 text-xs text-sky-600">{phone.phoneNumber}</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          )}
          {charity.contact && (
            <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 p-4">
              <Text className="text-base font-medium mb-1">{t('charity.contact')}</Text>
              {charity.contact.websiteUrl && (
                <Pressable
                  className="flex-row items-center"
                  onPress={() => Linking.openURL(`${charity.contact.websiteUrl}`)}
                >
                  <Icon name="web" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs text-sky-600">{charity.contact.websiteUrl}</Text>
                </Pressable>
              )}
              {charity.contact.email && (
                <Pressable
                  className="flex-row items-center"
                  onPress={() => Linking.openURL(`mailto:${charity.contact.email}`)}
                >
                  <Icon name="email" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs text-sky-600">{charity.contact.email}</Text>
                </Pressable>
              )}
              {charity.contact.phone && (
                <Pressable
                  className="flex-row items-center"
                  onPress={() => Linking.openURL(`tel:${charity.contact.phone}`)}
                >
                  <Icon name="phone" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs text-sky-600">{charity.contact.phone}</Text>
                </Pressable>
              )}
              {charity.contact.address && (
                <View className="flex-row items-center">
                  <Icon name="map-marker" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs">{charity.contact.address}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Charity
