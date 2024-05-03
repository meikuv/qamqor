import React, { FC, useState } from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import CodeInputField from './components/CodeInputField'
import TextButton from '../../../components/ui/TextButton'
import DefaultLayout from '../../../components/layout/DefaultLayout'

const Verification: FC = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { t } = useTranslation()

  const { email } = route.params
  const [pinReady, setPinReady] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')
  const MAX_INPUT_LENGTH = 4

  const { isLoading, verification } = useAuth()

  const verificationHandler = () => {
    verification(email, code).then(() => {
      navigation.navigate('Login')
    })
  }

  const handleChange = (inputValue: any) => {
    if (inputValue.length > MAX_INPUT_LENGTH) {
      inputValue = inputValue.substring(0, MAX_INPUT_LENGTH)
    }
    setCode(inputValue)
  }

  return (
    <DefaultLayout bgColor="bg-white">
      <View className="mx-5 justify-center items-center h-full">
        <View className="w-10/12">
          <Text className="text-center text-blue-900 text-2xl font-bold">
            {t('verification.title')}
          </Text>
          <Text className="text-gray-400 text-center text-xs">
            {t('verification.subTitle')}
            <Text className="text-gray-800"> {email}</Text>
          </Text>
          <CodeInputField
            setPinReady={setPinReady}
            code={code}
            setCode={handleChange}
            maxLength={MAX_INPUT_LENGTH}
          />
          <TextButton
            onPress={verificationHandler}
            title={t('verification.verificationButton')}
            isLoading={isLoading}
            disabled={!pinReady}
          />
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Verification
