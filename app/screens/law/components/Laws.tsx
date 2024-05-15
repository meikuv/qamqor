import React, { FC } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Collapsible from '../../../components/Collapsible'
import DefaultLayout from '../../../components/layout/DefaultLayout'

interface ILawsProps {
  type: string
}

const Laws: FC<ILawsProps> = ({ type }) => {
  return (
    <DefaultLayout isScrollView={false} bgColor="bg-white">
      <View className="flex bg-white rounded-xl shadow-xl shadow-gray-400 mx-2 my-2">
        <Collapsible title="Kulmanov Meirzhan">
          <Text>My name is Meirzhan and I am 22 years old.</Text>
        </Collapsible>
        <View className="flex-1 border-b-[1px] border-sky-400 mx-2 mt-2"></View>
        <Collapsible title="Kulmanov Meirzhan">
          <Text>My name is Meirzhan and I am 22 years old.</Text>
        </Collapsible>
        <View className="flex-1 border-b-[1px] border-sky-400 mx-2 mt-2"></View>
        <Collapsible title="Kulmanov Meirzhan">
          <Text>My name is Meirzhan and I am 22 years old.</Text>
        </Collapsible>
        <View className="flex-1 border-b-[1px] border-sky-400 mx-2 mt-2"></View>
      </View>
    </DefaultLayout>
  )
}

export default Laws
