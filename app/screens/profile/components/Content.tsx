import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import TextLink from '../../../components/ui/TextLink'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Content = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { logout } = useAuth()
  const links = [
    {
      key: 'history',
      iconName: 'history',
      title: t('history.title'),
    },
    {
      key: 'myRequests',
      iconName: 'clipboard',
      title: t('myRequests.title'),
    },
    {
      key: 'leaveReview',
      iconName: 'email-fast-outline',
      title: t('leaveReview.title'),
    },
  ]

  const others = [
    {
      key: 'settings',
      iconName: 'application-settings',
      title: t('settings.title'),
      navigate: 'Settings',
    },
    {
      key: 'changePassword',
      iconName: 'onepassword',
      title: t('changePassword.title'),
      navigate: 'ChangePassword',
    },
    {
      key: 'contactUs',
      iconName: 'contacts',
      title: t('contact.title'),
      navigate: 'ContactUs',
    },
  ]

  return (
    <ScrollView style={{ padding: 10 }}>
      <View className="w-full h-max items-start justify-center bg-white rounded-xl px-5 pt-4">
        {links.map((link) => (
          <TextLink key={link.key} title={link.title} iconName={link.iconName} onPress={() => {}} />
        ))}
      </View>
      <View className="w-full h-max items-start justify-center bg-white rounded-xl px-5 pt-4 mt-4">
        {others.map((other) => (
          <TextLink
            key={other.key}
            title={other.title}
            iconName={other.iconName}
            onPress={() => navigation.navigate(other.navigate)}
          />
        ))}
        <Pressable onPress={logout} className="flex-row items-center mb-4">
          <Icon name="power" size={25} color={'red'} style={{ marginRight: 15 }} />
          <Text className="text-base text-red-500">{t('logout.title')}</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default Content
