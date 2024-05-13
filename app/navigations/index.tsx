import React, { FC, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useAssistance } from '../hooks/useAssistance'
import { useUser } from '../hooks/useUser'
import { useAuth } from '../hooks/useAuth'
import 'react-native-gesture-handler'
import Splash from '../screens/splash'
import AuthStack from './auth'
import PrivateStack from './private'

const Stack = createNativeStackNavigator()

const Navigation: FC = () => {
  const { token } = useAuth()
  const { connectedUser } = useUser()
  const { getAllCharity, getAllVolunteer, getAllLawyer } = useAssistance()
  const [isSpalshLoading, setSplashIsloading] = useState<boolean>(true)

  useEffect(() => {
    const initial = async () => {
      setSplashIsloading(true)
      try {
        if (token) {
          await connectedUser()
          await getAllCharity()
          await getAllVolunteer()
          await getAllLawyer()
        }
      } finally {
        setSplashIsloading(false)
      }
    }

    initial()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'slide_from_right',
        }}
      >
        {isSpalshLoading ? (
          <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
        ) : token ? (
          <Stack.Screen options={{ headerShown: false }} name="Private" component={PrivateStack} />
        ) : (
          <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
