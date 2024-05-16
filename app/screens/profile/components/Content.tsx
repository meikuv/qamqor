import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import TextLink from '../../../components/ui/TextLink'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DefaultLayout from '../../../components/layout/DefaultLayout'

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

  const handleLogout = () => {
    logout()
  }

  return (
    <DefaultLayout bgColor="bg-white mt-4">
      <View
        style={{ backgroundColor: '#FFFFE0' }}
        className={`w-full h-max items-start justify-center bg-white rounded-xl shadow-sm shadow-black px-5 pt-4`}
      >
        {links.map((link) => (
          <TextLink
            key={link.key}
            title={link.title}
            iconName={link.iconName}
            textColor="#0f5645"
            iconColor="#0f5645"
            onPress={() => {}}
          />
        ))}
      </View>
      <View
        style={{ backgroundColor: '#FFFFE0' }}
        className={`w-full h-max items-start justify-center bg-white rounded-xl shadow-sm shadow-black px-5 pt-4 mt-4`}
      >
        {others.map((other) => (
          <TextLink
            key={other.key}
            title={other.title}
            iconName={other.iconName}
            textColor="#0f5645"
            iconColor="#0f5645"
            onPress={() => navigation.navigate(other.navigate)}
          />
        ))}
        <Pressable onPress={handleLogout} className="flex-row items-center mb-4">
          <Icon name="power" size={25} color={'red'} style={{ marginRight: 15 }} />
          <Text className="text-base text-red-500">{t('logout.title')}</Text>
        </Pressable>
      </View>
    </DefaultLayout>
  )
}

export default Content
