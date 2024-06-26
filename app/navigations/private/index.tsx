import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Map from '../../screens/map'
import Support from '../../screens/support'
import ProfileStack from '../profile'
import HomeStack from '../home'

const Tab = createBottomTabNavigator()

const PrivateStack = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#DEB887',
        tabBarActiveTintColor: '#0f5645',
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 5,
          backgroundColor: '#FFFFE0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#0f5645',
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: t('home.title'),
          tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: t('map.title'),
          tabBarIcon: ({ color }) => <Icon name="map" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarLabel: t('support.title'),
          tabBarIcon: ({ color }) => <Icon name="face-agent" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: t('profile.title'),
          tabBarIcon: ({ color }) => <Icon name="account" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default PrivateStack
