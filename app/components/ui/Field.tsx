import React, { FC } from 'react'
import { TextInput, View, Text } from 'react-native'
import { shadowLevel } from '../../../styles'
import IconButton from './IconButton'

interface IField {
  ref?: any
  onPress?: () => void
  onChange?: (value: string) => void
  onClose?: () => void
  color?: string
  shadow?: boolean
  closeIcon?: boolean
  value?: string | undefined
  placeholder?: string
  isSecure?: boolean
  error?: string
  label?: string
  isDisabled?: boolean
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always' | undefined
}

const Field: FC<IField> = ({
  ref,
  onPress,
  onChange,
  onClose,
  color,
  shadow,
  value,
  placeholder,
  isSecure,
  error,
  label,
  isDisabled,
  clearButtonMode,
  closeIcon,
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text style={{ color: '#0f5645' }} className="text-md ml-2 mt-2">
          {label}:
        </Text>
      )}
      <View className="flex-row items-center">
        <TextInput
          ref={ref}
          onPressIn={onPress}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#0f5645"
          value={value}
          secureTextEntry={isSecure}
          editable={!isDisabled}
          clearButtonMode={clearButtonMode}
          autoCapitalize="none"
          cursorColor="#000"
          autoComplete="off"
          style={{ backgroundColor: '#FFFFE0', color: '#0f5645' }}
          className={`flex-1 rounded-xl text-sm ${color ? color : 'bg-sky-50'} ${
            shadow ? `shadow-xl ${shadowLevel}` : null
          } mt-2 py-3 px-4 ${closeIcon ? 'mr-1' : null}`}
        />
        {closeIcon && (
          <IconButton name="close-circle" size={25} color="#0f5645" onPress={onClose} />
        )}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1 mx-2">{error}</Text>}
    </View>
  )
}

export default Field
