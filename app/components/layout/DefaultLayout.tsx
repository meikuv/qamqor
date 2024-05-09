import React, { FC, ReactNode } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'

interface IDefaultLayout {
  children: ReactNode
  isScrollView?: boolean
  paddingTop?: number
  bgColor?: string
  refreshControl?: ReactNode
  refreshing?: boolean
  onRefresh?: () => void
}

const DefaultLayout: FC<IDefaultLayout> = ({
  children,
  isScrollView,
  bgColor,
  paddingTop,
  refreshControl,
  refreshing,
  onRefresh,
}) => {
  return (
    <View className={`w-full h-full ${bgColor} ${paddingTop}`}>
      {isScrollView ? (
        <ScrollView refreshControl={refreshControl} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

export default DefaultLayout
