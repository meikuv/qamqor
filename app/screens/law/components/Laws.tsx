import React, { FC, useState } from 'react'
import { View, Text } from 'react-native'
import { ILaw } from '../../../services/assistance.service'
import { useAssistance } from '../../../hooks/useAssistance'
import { shadowLevel } from '../../../../styles'
import Collapsible from '../../../components/Collapsible'
import DefaultLayout from '../../../components/layout/DefaultLayout'

interface ILawsProps {
  law: ILaw[]
}

const Laws: FC<ILawsProps> = ({ law }) => {
  const { getAllLaw } = useAssistance()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getAllLaw()
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <DefaultLayout
      isScrollView={true}
      refreshing={refreshing}
      onRefresh={onRefresh}
      bgColor="bg-white"
    >
      <View
        style={{ backgroundColor: '#FFFFE0' }}
        className={`flex bg-white rounded-xl shadow-lg ${shadowLevel} mx-2 my-2`}
      >
        {law &&
          law?.map((item, index) => (
            <View key={item.id} className={`${index !== law.length - 1 ? 'null' : 'mb-2'}`}>
              <Collapsible title={item.title}>
                {item.lawArticles?.map((articles) => (
                  <View
                    key={articles.id}
                    style={{ backgroundColor: '#DEB887' }}
                    className="flex-1 rounded-xl mt-2 p-2"
                  >
                    <Text style={{ color: '#0f5645' }} className="flex-wrap text-xs font-bold">
                      {articles.title}
                    </Text>
                    <View className="mt-1">
                      {articles.descriptions.map((desc) => (
                        <Text key={desc.id} className="text-xs">{`\u2023 ${desc.title}`}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </Collapsible>
              {index !== law.length - 1 && (
                <View
                  style={{ borderBottomWidth: 2, borderBottomColor: '#0f5645' }}
                  className="flex-1 mx-4 mt-2"
                ></View>
              )}
            </View>
          ))}
      </View>
    </DefaultLayout>
  )
}

export default Laws
