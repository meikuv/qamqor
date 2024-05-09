import React, { FC, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import tokenService from '../services/token.service'
import Splash from '../screens/splash'
import AuthStack from './auth'
import PrivateStack from './private'
import Search from '../screens/search'
import { useAssistance } from '../hooks/useAssistance'
import { useUser } from '../hooks/useUser'

const Stack = createNativeStackNavigator()

const Navigation: FC = () => {
  const { isLoggedIn } = useAuth()
  const { connectedUser } = useUser()
  const { getAllCharity, getAllVolunteer } = useAssistance()
  const [token, setToken] = useState<any>(null)
  const [isSpalshLoading, setSplashIsloading] = useState<boolean>(true)

  const initial = async () => {
    setSplashIsloading(true)
    try {
      const accessToken = await tokenService.getLocalAccesToken()
      setToken(accessToken)
      if (accessToken) {
        await connectedUser()
        await getAllCharity()
        await getAllVolunteer()
      }
    } finally {
      setSplashIsloading(false)
    }
  }

  useEffect(() => {
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
        ) : isLoggedIn || token ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Private"
              component={PrivateStack}
            />
            <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />
          </>
        ) : (
          <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
