import React, { FC, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import Splash from '../screens/splash'
import AuthStack from './auth'
import PrivateStack from './private'
import Search from '../screens/search'

const Stack = createNativeStackNavigator()

const Navigation: FC = () => {
  const { isLoggedIn } = useAuth()
  const [isLoading, setIsloading] = useState<boolean>(true)

  setTimeout(() => {
    setIsloading(false)
  }, 2000)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'slide_from_right',
        }}
      >
        {isLoading ? (
          <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
        ) : isLoggedIn ? (
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
