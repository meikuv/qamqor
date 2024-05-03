import React, { FC } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import SafeLayout from '../../components/layout/SafeLayout'
import Field from '../../components/ui/Field'
import OverlayImage from './components/OverlayImage'
import TextLink from '../../components/ui/TextLink'

const Home: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
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
    <SafeLayout style="w-full h-full items-center bg-white">
      <View className="w-11/12 h-full">
        <Pressable onPressIn={() => navigation.navigate('Search')}>
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
          <OverlayImage index={1} height="h-52" />
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
        </ScrollView>
      </View>
    </SafeLayout>
  )
}

export default Home
