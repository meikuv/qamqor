import React, { FC } from 'react'
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/Ionicons'
import SafeLayout from '../../components/layout/SafeLayout'
import Field from '../../components/ui/Field'
import OverlayImage from './components/OverlayImage'
import TextLink from '../../components/ui/TextLink'
import VideoPlayer from './components/VideoPlayer'
import DefaultLayout from '../../components/layout/DefaultLayout'
import UserImage from '../../components/UserImage'

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
    { key: 3, title: t('home.lawyerTitle'), icon: 'account-tie-outline', navigate: 'LawyerList' },
  ]
  const markers = [
    { key: 1, title: t('home.charityCenter'), iconColor: 'red' },
    { key: 2, title: t('home.volunteerCenter'), iconColor: 'blue' },
    { key: 3, title: t('home.lawyerCenter'), iconColor: '#FFA500' },
  ]

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
      <View className="w-full h-full">
        <View>
          <ImageBackground
            source={require('../../../assets/heart.jpeg')}
            className="w-full h-44"
            imageStyle={{ borderRadius: 12 }}
          />
          <View className="absolute inset-0 w-full h-full bg-gray-900 opacity-50 rounded-xl"></View>
          <View className="absolute top-0 left-0 right-0 bottom-10 justify-end items-center">
            <Text className="text-white text-sm font-bold text-center">{image[0].text}</Text>
          </View>
          <View className="w-full absolute -top-5 left-0 right-0 bottom-10 flex-1 flex-row justify-between items-center">
            <Pressable className="w-9/12 mx-2" onPressIn={() => navigation.navigate('Search')}>
              <Field
                placeholder={t('home.search')}
                shadow={true}
                color="bg-white"
                isDisabled={true}
              />
            </Pressable>
            <UserImage imageStyle="w-16 h-16 mx-2 mt-2 rounded-full" />
          </View>
        </View>
        {/* <Pressable onPressIn={() => navigation.navigate('Search')}>
          <Field placeholder={t('home.search')} shadow={true} color="bg-white" isDisabled={true} />
        </Pressable>
        <ScrollView style={{ marginTop: 12 }} showsVerticalScrollIndicator={false}>
          <OverlayImage index={0} height="h-36" />
          <View className="flex-col items-center justify-center mt-5 mx-2">
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
          <View className="flex-col items-start justify-center mt-5 mx-2">
            {markers.map((marker) => (
              <TextLink
                key={marker.key}
                title={marker.title}
                iconName="map-marker"
                iconColor={marker.iconColor}
                onPress={() => {}}
              />
            ))}
          </View>
        </ScrollView> */}
      </View>
    </DefaultLayout>
  )
}

export default Home
