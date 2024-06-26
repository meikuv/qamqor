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
  const { connectedUser, user } = useUser()
  const {
    getAllCharity,
    getAllVolunteer,
    getAllLawyer,
    getAllLaw,
    getAllMapLocation,
    getAllCanHelp,
    getAllNeedHelp,
    getAllMedical,
  } = useAssistance()
  const [isSpalshLoading, setSplashIsloading] = useState<boolean>(true)

  useEffect(() => {
    const initial = async () => {
      setSplashIsloading(true)
      try {
        if (token) {
          const data: any = await connectedUser()
          await getAllLawyer()
          await getAllLaw()
          await getAllCharity()
          await getAllVolunteer()
          await getAllMapLocation()
          await getAllCanHelp(data.username)
          await getAllNeedHelp(data.username)
          await getAllMedical()
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
