import React, { useState } from 'react'
import { useWindowDimensions, View, Text, TouchableOpacity } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import General from './components/General'
import Notification from './components/Notification'

const renderScene = SceneMap({
  general: General,
  notification: Notification,
})

const Settings = () => {
  const { t } = useTranslation()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([{ key: 'general' }, { key: 'notification' }])

  const renderTabBar = (props: any) => (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFE0', elevation: 2 }}>
      {props.navigationState.routes.map((route: any, i: any) => (
        <TouchableOpacity
          key={route.key}
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: index === i ? 2 : 0,
            borderBottomColor: index === i ? '#0f5645' : 'transparent',
          }}
          onPress={() => setIndex(i)}
        >
          <Text style={{ color: index === i ? '#0f5645' : '#DEB887', fontWeight: 'bold' }}>
            {t(`settings.${route.key}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <TabView
      style={{ backgroundColor: '#FFFFE0' }}
      className="py-24"
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  )
}

export default Settings
