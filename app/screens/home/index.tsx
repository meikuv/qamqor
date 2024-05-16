import React, { FC } from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import TextLink from '../../components/ui/TextLink'
import VideoPlayer from './components/VideoPlayer'
import DefaultLayout from '../../components/layout/DefaultLayout'

const Home: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const image = [
    { uri: require('../../../assets/heart.jpeg'), text: `"${t('home.overlayOne')}"` },
    { uri: require('../../../assets/heart.jpeg'), text: `"${t('home.overlayTwo')}"` },
  ]
  const links = [
    { key: 1, title: t('home.charityTitle'), icon: 'hand-heart', navigate: 'CharityList' },
    { key: 2, title: t('home.volunteerTitle'), icon: 'account-heart', navigate: 'VolunteerList' },
    { key: 3, title: t('home.lawyerTitle'), icon: 'account-tie-outline', navigate: 'Law' },
  ]
  const markers = [
    { key: 1, title: t('home.charityCenter'), iconColor: 'red' },
    { key: 2, title: t('home.volunteerCenter'), iconColor: 'blue' },
    { key: 3, title: t('home.lawyerCenter'), iconColor: '#FFA500' },
  ]

  return (
    <DefaultLayout isScrollView={true} refreshing={false}>
      <View className="flex-1">
        <View>
          <ImageBackground
            source={require('../../../assets/heart.jpeg')}
            className="w-full h-48"
            imageStyle={{ borderRadius: 12 }}
          />
          <View className="absolute inset-0 w-full h-full bg-gray-900 opacity-50 rounded-xl"></View>
          <View className="absolute top-0 left-0 right-0 bottom-10 justify-end items-center">
            <Text style={{ color: '#FFFFE0' }} className="text-base font-bold text-center">
              {image[0].text}
            </Text>
          </View>
          <View className="w-full absolute -top-9 left-0 right-0 bottom-10 flex-1 flex-row justify-center items-center">
            <Pressable className="w-11/12" onPress={() => navigation.navigate('Search')}>
              <View style={{ backgroundColor: '#FFFFE0' }} className="p-4 rounded-xl">
                <Text style={{ color: '#0f5645' }}>{t('home.search')}</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{ backgroundColor: '#0f5645' }}
          className={`bg-white flex-col items-center justify-center rounded-xl shadow-sm shadow-black my-3 mx-2 px-4 pt-4`}
        >
          {links.map((link) => (
            <TextLink
              key={link.key}
              title={link.title}
              iconName={link.icon}
              onPress={() => navigation.navigate(link.navigate)}
            />
          ))}
        </View>
        <VideoPlayer />
        <View className="bg-[#FFFFE0] flex-col items-center justify-center rounded-xl shadow-sm shadow-black mt-3 mb-5 mx-2 px-4 pt-4">
          {markers.map((marker) => (
            <TextLink
              key={marker.key}
              title={marker.title}
              iconName="map-marker"
              iconColor={marker.iconColor}
              textColor="#0f5645"
              onPress={() => {}}
            />
          ))}
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Home
