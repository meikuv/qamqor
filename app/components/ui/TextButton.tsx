import React, { FC } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import Loader from './Loader'

interface ITextButton {
  onPress: () => void
  title: string
  isLoading: boolean
  disabled?: boolean
}

const TextButton: FC<ITextButton> = ({ onPress, title, isLoading, disabled }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      className="bg-sky-600 rounded-xl w-full my-4 py-3"
      disabled={disabled}
    >
      <View className="items-center">
        {isLoading ? (
          <Loader size="small" color="#ffffff" />
        ) : (
          <Text className="text-white">{title}</Text>
        )}
      </View>
    </TouchableHighlight>
  )
}

export default TextButton
