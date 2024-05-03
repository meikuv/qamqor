import React, { FC, ReactNode } from 'react'
import { View, ScrollView } from 'react-native'

interface IDefaultLayout {
  children: ReactNode
  isScrollView?: boolean
  paddingTop?: number
  bgColor?: string
}

const DefaultLayout: FC<IDefaultLayout> = ({ children, isScrollView, bgColor, paddingTop }) => {
  return (
    <View className={`w-full h-full ${bgColor} ${paddingTop}`}>
      {isScrollView ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

export default DefaultLayout
