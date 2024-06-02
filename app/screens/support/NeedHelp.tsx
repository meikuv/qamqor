import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../hooks/useAssistance'
import DefaultLayout from '../../components/layout/DefaultLayout'
import Field from '../../components/ui/Field'
import TextButton from '../../components/ui/TextButton'

export interface INeedHelpProps {
  route: {
    params: {
      organization: string
    }
  }
}

const NeedHelp: FC<INeedHelpProps> = ({ route }) => {
  const { user } = useUser()
  const { t } = useTranslation()
  const { organization } = route.params
  const { isLoading, createNeedHelp, getAllNeedHelp } = useAssistance()
  const [data, setData] = useState<any>({
    organization: organization,
    username: user.username,
    fullName: `${user.firstName} ${user.lastName}` || '',
    supportType: '',
    expand: '',
    phoneNumber: user.phoneNumber || '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    const fieldsToCheck = ['fullName', 'supportType', 'expand', 'phoneNumber']

    fieldsToCheck.forEach((field) => {
      if (!data[field] || !data[field].trim()) {
        errors[field] = t(`volunteer.needHelp.${field}Error`)
      }
    })

    return errors
  }

  const createNeedHelpHandler = async () => {
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    await createNeedHelp(data)
    await getAllNeedHelp(user.username)
    setData({
      organization: organization,
      username: user.username,
      fullName: `${user?.firstName} ${user?.lastName}` || '',
      supportType: '',
      expand: '',
      phoneNumber: user.phoneNumber || '',
    })
  }

  return (
    <DefaultLayout isScrollView={true}>
      <View className="flex-1 mx-4 mt-2">
        <Field
          value={data.fullName}
          label={t('volunteer.needHelp.fullName')}
          onChange={(val) => {
            setData({ ...data, fullName: val })
            setErrors({ ...errors, fullName: '' })
          }}
          error={errors.fullName}
          shadow={true}
        />
        <Field
          value={data.phoneNumber}
          label={t('volunteer.needHelp.phoneNumber')}
          onChange={(val) => {
            setData({ ...data, phoneNumber: val })
            setErrors({ ...errors, phoneNumber: '' })
          }}
          error={errors.phoneNumber}
          shadow={true}
        />
        <Field
          value={data.supportType}
          label={t('volunteer.needHelp.supportType')}
          onChange={(val) => {
            setData({ ...data, supportType: val })
            setErrors({ ...errors, supportType: '' })
          }}
          error={errors.supportType}
          shadow={true}
        />
        <Field
          value={data.expand}
          label={t('volunteer.needHelp.expand')}
          onChange={(val) => {
            setData({ ...data, expand: val })
            setErrors({ ...errors, expand: '' })
          }}
          error={errors.expand}
          isTextArea={true}
          shadow={true}
        />
        <TextButton
          onPress={createNeedHelpHandler}
          isLoading={isLoading}
          title={t('volunteer.needHelp.send')}
        />
      </View>
    </DefaultLayout>
  )
}

export default NeedHelp
