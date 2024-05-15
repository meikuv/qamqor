import React, { FC, ReactNode, useRef, useState } from 'react'
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native'

interface ICollapsibleProps {
  title: string
  children: ReactNode
}

const Collapsible: FC<ICollapsibleProps> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true)
  const opacityAnim = useRef(new Animated.Value(0)).current

  const toggleCollapse = () => {
    if (collapsed) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
    setCollapsed(!collapsed)
  }

  const scaleYInterpolate = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const heightStyle = collapsed ? { maxHeight: 0, overflow: 'hidden' } : {}

  return (
    <View className="flex px-4 pt-2">
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <Text className="text-sm font-semibold">{title}</Text>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[{ transform: [{ scaleY: scaleYInterpolate }], opacity: opacityAnim }, heightStyle]}
      >
        {children}
      </Animated.View>
    </View>
  )
}

export default Collapsible
