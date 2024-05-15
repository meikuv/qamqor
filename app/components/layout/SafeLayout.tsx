import React, { FC, ReactNode } from 'react'
import { SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'

interface ISafeLayout {
  children: ReactNode
  isScrollView?: boolean
  style?: string
}

const SafeLayout: FC<ISafeLayout> = ({ children, isScrollView, style }) => {
  return (
    <SafeAreaView
      style={{ backgroundColor: '#FFFFE0' }}
      className={`w-full h-full ${style} ${Platform.OS === 'android' ? ` pt-[25px]` : null}`}
    >
      {isScrollView ? <ScrollView className="flex-1">{children}</ScrollView> : children}
    </SafeAreaView>
  )
}

export default SafeLayout
