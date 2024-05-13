import React, { FC } from 'react'
import { View, Text } from 'react-native'

interface ILawsProps {
  type: string
}

const Laws: FC<ILawsProps> = ({ type }) => {
  return (
    <View>
      <Text>Laws</Text>
    </View>
  )
}

export default Laws
