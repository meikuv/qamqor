import React, { FC, useState } from 'react'
import { View, Text, Image, ScrollView, Pressable, Linking, PixelRatio } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useI18n } from '../hooks/useI18n'
import { IAssistance } from '../services/assistance.service'
import WebView from 'react-native-webview'
import handsImage from '../../assets/hands.jpg'
import heartImage from '../../assets/heart.jpeg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DefaultLayout from './layout/DefaultLayout'
import DebitCard from './DebitCard'
import IconButton from './ui/IconButton'

interface IAssistanceProps {
  route: {
    params: {
      assistance: IAssistance
      imageIndex: number
    }
  }
}

const Assistance: FC<IAssistanceProps> = ({ route }) => {
  const { assistance, imageIndex } = route.params
  const image = [handsImage, heartImage]
  const { t } = useTranslation()
  const { locale } = useI18n()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [contentHeight, setContentHeight] = useState(0)

  const webViewScript = `
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true;
  `

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
      <View className="flex-1">
        <View className="h-36 overflow-hidden">
          <Image
            source={image[imageIndex]}
            className="w-full h-full rounded-b-xl"
            resizeMode="cover"
          />
        </View>
        <View className="flex justify-center items-center -mt-20">
          <View style={{ backgroundColor: '#FFFFE0' }} className="p-2 rounded-full">
            <Image
              source={{ uri: assistance.photoUrl }}
              className="h-32 w-32 bg-white rounded-full"
            />
          </View>
        </View>
        <View className="my-2">
          <View className="items-center mx-5">
            <Text className="text-center text-2xl font-medium">{assistance.name}</Text>
          </View>
          <View
            style={{ backgroundColor: '#FFFFE0' }}
            className="h-max bg-white rounded-xl shadow-md shadow-gray-600 mx-5 mt-2 p-4"
          >
            <Text className="text-base font-medium">
              {imageIndex === 0 ? t('charity.about') : t('volunteer.about')}
            </Text>
            <Text className="text-xs mt-1">
              {locale === 'ru' ? assistance.descriptionRU : assistance.descriptionKZ}
            </Text>
          </View>
          {assistance.postUrl && (
            <View className="flex bg-white rounded-xl shadow-xl shadow-gray-400 overflow-hidden mx-5 mt-2">
              <WebView
                style={{ height: contentHeight }}
                automaticallyAdjustContentInsets={false}
                scrollEnabled={false}
                startInLoadingState={true}
                source={{ uri: assistance.postUrl }}
                onMessage={(event) => {
                  const height = parseInt(event.nativeEvent.data) / PixelRatio.get()
                  if (!isNaN(height)) {
                    setContentHeight(height)
                  }
                }}
                javaScriptEnabled={true}
                injectedJavaScript={webViewScript}
                domStorageEnabled={true}
              />
            </View>
          )}
          {assistance.directions.length !== 0 && (
            <View
              style={{ backgroundColor: '#FFFFE0' }}
              className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 p-4"
            >
              <Text className="text-base font-medium mb-1">{t('charity.direct')}</Text>
              {assistance.directions.map((direction) => (
                <Text key={direction.id} className="text-xs">{`\u2023 ${
                  locale === 'ru' ? direction.titleRU : direction.titleKZ
                }`}</Text>
              ))}
            </View>
          )}
          {assistance.requisites.length !== 0 && (
            <View
              style={{ backgroundColor: '#FFFFE0' }}
              className="h-max bg-white rounded-xl shadow-md shadow-gray-600 mx-5 py-4 pl-4"
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {assistance.requisites.map((requisite) => (
                  <DebitCard key={requisite.id} debitCardProps={requisite} />
                ))}
              </ScrollView>
            </View>
          )}
          {assistance.locations.length !== 0 && (
            <View
              style={{ backgroundColor: '#FFFFE0' }}
              className="h-max bg-white rounded-xl shadow-md shadow-gray-600 mx-5 my-2 p-4"
            >
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
                assistance.locations.map((location) => (
                  <View
                    key={location.id}
                    style={{ backgroundColor: '#FFFFE0' }}
                    className="h-max bg-white rounded-xl shadow-md shadow-gray-600 p-2 mt-2"
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
          {assistance.phoneNumbers.length !== 0 && (
            <View
              style={{ backgroundColor: '#FFFFE0' }}
              className="h-max bg-white rounded-xl shadow-md shadow-gray-600 mx-5 my-2 p-4"
            >
              <Text className="text-base font-medium mb-1">{t('charity.phone')}</Text>
              {assistance.phoneNumbers.map((phone) => (
                <View
                  key={phone.id}
                  style={{ backgroundColor: '#FFFFE0' }}
                  className="h-max bg-white rounded-xl shadow-md shadow-gray-600 p-2 mt-2"
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
          {assistance.contact && (
            <View
              style={{ backgroundColor: '#FFFFE0' }}
              className="h-max bg-white rounded-xl shadow-md shadow-gray-600 mx-5 my-2 p-4"
            >
              <Text className="text-base font-medium mb-1">{t('charity.contact')}</Text>
              {assistance.contact.websiteUrl && (
                <Pressable
                  className="flex-row items-center"
                  onPress={() => Linking.openURL(`${assistance.contact.websiteUrl}`)}
                >
                  <Icon name="web" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs text-sky-600">
                    {assistance.contact.websiteUrl}
                  </Text>
                </Pressable>
              )}
              {assistance.contact.email && (
                <Pressable
                  className="flex-row items-center"
                  onPress={() => Linking.openURL(`mailto:${assistance.contact.email}`)}
                >
                  <Icon name="email" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs text-sky-600">{assistance.contact.email}</Text>
                </Pressable>
              )}
              {assistance.contact.phone && (
                <Pressable
                  className="flex-row items-center"
                  onPress={() => Linking.openURL(`tel:${assistance.contact.phone}`)}
                >
                  <Icon name="phone" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs text-sky-600">{assistance.contact.phone}</Text>
                </Pressable>
              )}
              {assistance.contact.address && (
                <View className="flex-row items-center">
                  <Icon name="map-marker" size={15} style={{ marginRight: 10 }} />
                  <Text className="flex-1 text-xs">{assistance.contact.address}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Assistance
