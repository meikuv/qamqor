import React, { useState } from 'react'
import { View } from 'react-native'
import DefaultLayout from '../../components/layout/DefaultLayout'
import Field from '../../components/ui/Field'
import { useUser } from '../../hooks/useUser'
import { useTranslation } from 'react-i18next'
import TextButton from '../../components/ui/TextButton'

const CanHelp = () => {
  const { user } = useUser()
  const { t } = useTranslation()
  const [data, setData] = useState<any>({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    age: null,
    motivation: '',
    phoneNumber: user.phoneNumber || '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  return (
    <DefaultLayout isScrollView={true}>
      <View className="flex-1 mx-4 mt-2">
        <Field
          value={data.firstName}
          label={t('volunteer.canHelp.firstName')}
          onChange={(val) => {
            setData({ ...data, firstName: val })
            setErrors({ ...errors, firstName: '' })
          }}
          error={errors.firstName}
          shadow={true}
        />
        <Field
          value={data.lastName}
          label={t('volunteer.canHelp.lastName')}
          onChange={(val) => {
            setData({ ...data, lastName: val })
            setErrors({ ...errors, lastName: '' })
          }}
          error={errors.lastName}
          shadow={true}
        />
        <Field
          value={data.email}
          label={t('volunteer.canHelp.email')}
          onChange={(val) => {
            setData({ ...data, email: val })
            setErrors({ ...errors, email: '' })
          }}
          error={errors.email}
          shadow={true}
        />
        <Field
          value={data.age}
          label={t('volunteer.canHelp.age')}
          onChange={(val) => {
            setData({ ...data, age: val })
            setErrors({ ...errors, age: '' })
          }}
          error={errors.age}
          shadow={true}
        />
        <Field
          value={data.motivation}
          label={t('volunteer.canHelp.motivation')}
          onChange={(val) => {
            setData({ ...data, motivation: val })
            setErrors({ ...errors, motivation: '' })
          }}
          error={errors.motivation}
          isTextArea={true}
          shadow={true}
        />
        <Field
          value={data.phoneNumber}
          label={t('volunteer.canHelp.phoneNumber')}
          onChange={(val) => {
            setData({ ...data, phoneNumber: val })
            setErrors({ ...errors, phoneNumber: '' })
          }}
          error={errors.phoneNumber}
          shadow={true}
        />
        <TextButton
          onPress={function (): void {
            throw new Error('Function not implemented.')
          }}
          title={t('volunteer.canHelp.send')}
        />
      </View>
    </DefaultLayout>
  )
}

export default CanHelp
