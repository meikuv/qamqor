import React, { FC } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import Loader from './Loader'

interface ITextButton {
  onPress: () => void
  title: string
  isLoading?: boolean
  disabled?: boolean
}

const TextButton: FC<ITextButton> = ({ onPress, title, isLoading, disabled }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{ backgroundColor: '#0f5645' }}
      className="rounded-xl w-max my-4 py-3 px-2"
      disabled={disabled}
    >
      <View className="items-center">
        {isLoading ? (
          <Loader size="small" color="#FFFFE0" />
        ) : (
          <Text style={{ color: '#FFFFE0' }}>{title}</Text>
        )}
      </View>
    </TouchableHighlight>
  )
}

export default TextButton
