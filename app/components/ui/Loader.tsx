import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'

interface ILoader {
  size: number | 'small' | 'large' | undefined
  color: string
}

const Loader: FC<ILoader> = ({ size, color }) => {
  return <ActivityIndicator size={size} color={color} />
}

export default Loader
