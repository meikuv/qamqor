import React, { FC } from 'react'
import { TextInput, View, Text } from 'react-native'
import IconButton from './IconButton'

interface IField {
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
    <>
      {label && <Text className="text-sky-600 text-md ml-2 mt-2">{label}:</Text>}
      <View className="flex-row items-center">
        <TextInput
          onPressIn={onPress}
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          secureTextEntry={isSecure}
          editable={!isDisabled}
          clearButtonMode={clearButtonMode}
          autoCapitalize="none"
          cursorColor="#000"
          autoComplete="off"
          className={`flex-1 rounded-xl text-sm ${color ? color : 'bg-sky-50'} ${
            shadow ? 'shadow-2xl shadow-gray-600' : null
          } mt-2 py-3 px-4 ${closeIcon ? 'mr-1' : null}`}
        />
        {closeIcon && (
          <IconButton name="close-circle" size={25} color="#3b82f6" onPress={onClose} />
        )}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1 mx-2">{error}</Text>}
    </>
  )
}

export default Field
