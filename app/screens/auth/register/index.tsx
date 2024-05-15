import React, { FC, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Loader from '../../../components/ui/Loader'
import Field from '../../../components/ui/Field'
import TextButton from '../../../components/ui/TextButton'
import DefaultLayout from '../../../components/layout/DefaultLayout'

interface IData {
  email: string
  username: string
  password: string
}

const Register: FC = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { register, isLoading } = useAuth()
  const [data, setData] = useState<IData>({ username: '', password: '', email: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!data.username || !data.username.trim()) {
      errors.username = t('register.usernameError')
    }

    if (!data.password || !data.password.trim()) {
      errors.password = t('register.passwordError')
    }

    if (!data.email || !data.email.trim()) {
      errors.email = t('register.emailError')
    }

    return errors
  }

  const registerHandler = async () => {
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    const { username, email, password } = data
    await register(username, email, password).then(() => {
      navigation.navigate('Verification', {
        email: data.email,
      })
    })
    setData({} as IData)
  }

  return (
    <DefaultLayout>
      <View className="mx-5 justify-center items-center h-full">
        <View className="w-10/12">
          {isLoading ? (
            <Loader size="large" color="#3b82f6" />
          ) : (
            <>
              <Text style={{ color: '#0f5645' }} className="text-center text-2xl font-bold mb-5">
                {t('register.title')}
              </Text>
              <Field
                value={data.username}
                placeholder={t('register.username')}
                onChange={(val) => {
                  setData({ ...data, username: val })
                  setErrors({ ...errors, username: '' })
                }}
                shadow={true}
                error={errors.username}
              />
              <Field
                value={data.email}
                placeholder={t('register.email')}
                onChange={(val) => {
                  setData({ ...data, email: val })
                  setErrors({ ...errors, email: '' })
                }}
                shadow={true}
                error={errors.email}
              />
              <Field
                value={data.password}
                placeholder={t('register.password')}
                onChange={(val) => {
                  setData({ ...data, password: val })
                  setErrors({ ...errors, password: '' })
                }}
                isSecure={true}
                shadow={true}
                error={errors.password}
              />
              <TextButton
                onPress={registerHandler}
                title={t('register.registerButton')}
                isLoading={isLoading}
              />
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#DEB887' }} className="text-center mt-1 font-semibold">
                  {t('register.toLogin')}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Register
