import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import 'react-native-gesture-handler'
import Home from '../../screens/home'
import CharityList from '../../screens/home/components/CharityList'
import VolunteerList from '../../screens/home/components/VolunteerList'
import Search from '../../screens/search'
import Assistance from '../../components/Assistance'
import Law from '../../screens/law'

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
        name="Assistance"
        component={Assistance}
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
        name="Law"
        component={Law}
        options={{
          headerTitle: `${t('home.lawyerTitle')}`,
          headerTransparent: false,
          headerTintColor: 'rgb(2, 132, 199)',
        }}
      />
      <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />
    </Stack.Navigator>
  )
}

export default HomeStack
