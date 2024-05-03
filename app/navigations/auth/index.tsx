import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: '#3b82f6',
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: '#3b82f6',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
