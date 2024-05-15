import React, { FC, useState } from 'react'
import { useWindowDimensions, View, Text, TouchableOpacity } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import Laws from './components/Laws'
import Lawyers from './components/Lawyers'
import { useAssistance } from '../../hooks/useAssistance'

interface ILawsProps {
  route?: {
    params: {
      scrollToIndex: number
    }
  }
}

const Law: FC<ILawsProps> = ({ route }) => {
  const { t } = useTranslation()
  const { lawList } = useAssistance()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'lawyers', title: 'lawyer.title' },
    { key: 'criminal', title: 'criminal' },
    { key: 'civil', title: 'civil' },
    { key: 'administrative', title: 'administrative' },
  ])

  const groupLawsByType = (laws: any) => {
    const lawsByType = {
      criminal: [],
      civil: [],
      administrative: [],
    }
    laws.forEach((law: any) => {
      switch (law.type) {
        case 'Уголовное право':
          lawsByType.criminal.push(law)
          break
        case 'Гражданское право':
          lawsByType.civil.push(law)
          break
        case 'Административное право':
          lawsByType.administrative.push(law)
          break
        default:
          break
      }
    })
    return lawsByType
  }

  const lawsByType = groupLawsByType(lawList)

  const renderScene = ({ route: routing }) => {
    switch (routing.key) {
      case 'lawyers':
        return <Lawyers scrollToIndex={route?.params?.scrollToIndex} />
      case 'criminal':
      case 'civil':
      case 'administrative':
        return <Laws law={lawsByType[routing.key]} />
      default:
        return null
    }
  }

  const renderTabBar = (props: any) => (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFE0', elevation: 2 }}>
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
              borderBottomColor: index === i ? '#0f5645' : 'transparent',
            }}
            onPress={() => setIndex(i)}
          >
            <Text
              style={{
                color: index === i ? '#0f5645' : '#DEB887',
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
