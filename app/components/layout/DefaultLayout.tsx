import React, { FC, ReactNode } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'

interface IDefaultLayout {
  children: ReactNode
  isScrollView?: boolean
  bgColor?: string
  paddingTop?: number
  refreshing?: boolean
  onRefresh?: () => void
}

const DefaultLayout: FC<IDefaultLayout> = ({
  children,
  isScrollView,
  bgColor,
  paddingTop,
  refreshing,
  onRefresh,
}) => {
  return (
    <View className={`w-full h-full ${bgColor} ${paddingTop}`}>
      {isScrollView ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing === true ? true : false} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

export default DefaultLayout
