import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import 'react-native-gesture-handler'
import Login from '../../screens/auth/login'
import Register from '../../screens/auth/register'
import Verification from '../../screens/auth/verification'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: '#0f5645',
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: '#0f5645',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
