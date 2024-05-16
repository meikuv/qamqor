import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import 'react-native-gesture-handler'
import Profile from '../../screens/profile'
import Settings from '../../screens/settings'
import Update from '../../screens/profile/components/Update'
import ChangePassword from '../../screens/changePassword'
import ContactUs from '../../screens/contact'

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerBackTitleVisible: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, headerStyle: { backgroundColor: '#FFFFE0' } }}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={Update}
        options={{
          title: `${t('profileUpdate.title')}`,
          headerTransparent: false,
          headerTintColor: '#0f5645',
          headerStyle: { backgroundColor: '#FFFFE0' },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: `${t('settings.title')}`,
          headerTransparent: true,
          headerTintColor: '#0f5645',
          headerStyle: { backgroundColor: '#FFFFE0' },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: `${t('changePassword.title')}`,
          headerTransparent: false,
          headerTintColor: '#0f5645',
          headerStyle: { backgroundColor: '#FFFFE0' },
        }}
      />

      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: `${t('contact.title')}`,
          headerTransparent: false,
          headerTintColor: '#0f5645',
          headerStyle: { backgroundColor: '#FFFFE0' },
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
