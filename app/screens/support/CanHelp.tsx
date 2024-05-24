import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../hooks/useAssistance'
import DefaultLayout from '../../components/layout/DefaultLayout'
import Field from '../../components/ui/Field'
import TextButton from '../../components/ui/TextButton'

export interface ICanHelpProps {
  route: {
    params: {
      organization: string
    }
  }
}

const CanHelp: FC<ICanHelpProps> = ({ route }) => {
  const { user } = useUser()
  const { t } = useTranslation()
  const { organization } = route.params
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { isLoading, createCanHelp, getAllCanHelp } = useAssistance()
  const [data, setData] = useState<any>({
    organization: organization,
    username: user.username,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    age: 0,
    motivation: '',
    phoneNumber: user.phoneNumber || '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    const fieldsToCheck = ['firstName', 'lastName', 'email', 'age', 'motivation', 'phoneNumber']

    fieldsToCheck.forEach((field) => {
      if (!data[field] || !data[field].trim()) {
        errors[field] = t(`volunteer.canHelp.${field}Error`)
      }
    })

    return errors
  }

  const createCanHelpHandler = async () => {
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    await createCanHelp(data)
    await getAllCanHelp(user.username)

    setData({
      organization: organization,
      username: user.username,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      age: 0,
      motivation: '',
      phoneNumber: user.phoneNumber || '',
    })
  }

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
          onPress={createCanHelpHandler}
          isLoading={isLoading}
          title={t('volunteer.canHelp.send')}
        />
      </View>
    </DefaultLayout>
  )
}

export default CanHelp
