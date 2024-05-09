import React, { FC, useEffect, useRef } from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { useAssistance } from '../../hooks/useAssistance'
import { useUser } from '../../hooks/useUser'
import tokenService from '../../services/token.service'

const Splash: FC = () => {
  const { connectedUser } = useUser()
  const { getAllCharity, getAllVolunteer } = useAssistance()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {})

    const initial = async () => {
      const accessToken = await tokenService.getLocalAccesToken()
      if (accessToken) {
        await connectedUser()
        await getAllCharity()
        await getAllVolunteer()
      } else {
        return
      }
    }
    initial()
  }, [fadeAnim])

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../../../assets/app-splash.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default Splash
