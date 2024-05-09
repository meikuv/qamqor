import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import Home from '../../screens/home'
import CharityList from '../../screens/home/components/charity/CharityList'
import Charity from '../../screens/home/components/charity'
import VolunteerList from '../../screens/home/components/volunteer/VolunteerList'
import Volunteer from '../../screens/home/components/volunteer'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="CharityList"
        component={CharityList}
        options={{
          headerTitle: `${t('home.charityTitle')}`,
          headerTransparent: false,
          headerTintColor: 'rgb(2, 132, 199)',
        }}
      />
      <Stack.Screen
        name="Charity"
        component={Charity}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'rgb(2, 132, 199)',
        }}
      />
      <Stack.Screen
        name="VolunteerList"
        component={VolunteerList}
        options={{
          headerTitle: `${t('home.volunteerTitle')}`,
          headerTransparent: false,
          headerTintColor: 'rgb(2, 132, 199)',
        }}
      />
      <Stack.Screen
        name="Volunteer"
        component={Volunteer}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'rgb(2, 132, 199)',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
