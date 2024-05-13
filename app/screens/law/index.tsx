import React, { useState } from 'react'
import { useWindowDimensions, View, Text, TouchableOpacity } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import Laws from './components/Laws'
import Lawyers from './components/Lawyers'

const Law = () => {
  const { t } = useTranslation()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'lawyers', title: 'lawyer.title' },
    { key: 'criminal', title: 'criminal' },
    { key: 'civil', title: 'civil' },
    { key: 'administrative', title: 'administrative' },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'lawyers':
        return <Lawyers />
      case 'criminal':
      case 'civil':
      case 'administrative':
        return <Laws type={route.key} />
      default:
        return null
    }
  }

  const renderTabBar = (props: any) => (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', elevation: 2 }}>
      {props.navigationState.routes.map(
        (
          route: { key: React.Key | null | undefined; title: any },
          i: React.SetStateAction<number>
        ) => (
          <TouchableOpacity
            key={route.key}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderBottomWidth: index === i ? 2 : 0,
              borderBottomColor: index === i ? 'rgb(2, 132, 199)' : 'transparent',
            }}
            onPress={() => setIndex(i)}
          >
            <Text
              style={{
                color: index === i ? 'rgb(2, 132, 199)' : '#000',
                fontWeight: '500',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              {t(`law.${route.title}`)}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  )
}

export default Law