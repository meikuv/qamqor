import React, { FC, useRef, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

interface ICodeInput {
  setPinReady: (value: boolean) => void
  code: string
  setCode: (value: string) => void
  maxLength: number
}

const CodeInputField: FC<ICodeInput> = ({ setPinReady, code, setCode, maxLength }) => {
  const codeDigitsArray = new Array(maxLength).fill(0)
  const textInputRef = useRef<TextInput>(null)
  const [inputIsFocused, setInputIsFocused] = useState(false)

  const handleOnPress = () => {
    setInputIsFocused(true)
    textInputRef?.current?.focus()
  }

  const handleOnBlur = () => {
    setInputIsFocused(false)
  }

  useEffect(() => {
    setPinReady(code.length === maxLength)
    return () => setPinReady(false)
  }, [code])

  const toCodeDigitInput = (_value: any, index: any) => {
    const emptyInputChar = ''
    const digit = code[index] || emptyInputChar

    const isCurrentDigit = index === code.length
    const isLastDigit = index === maxLength - 1
    const isCodeFull = code.length === maxLength

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

    const classNames = `border-gray-300 border-2 rounded p-3 w-14 h-14 ${
      (inputIsFocused && isDigitFocused) || isCodeFull ? 'border-sky-400' : ''
    }`

    return (
      <View className={classNames} key={index}>
        <Text className="text-center text-xl font-bold text-sky-600">{digit}</Text>
      </View>
    )
  }

  return (
    <View className="items-center justify-center mt-14">
      <TouchableOpacity className="w-full flex-row justify-between" onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </TouchableOpacity>
      <TextInput
        className="w-1 h-1 opacity-0"
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
      />
    </View>
  )
}

export default CodeInputField
