import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../hooks/useUser'
import { IChangePassword } from '../../services/user.service'
import Field from '../../components/ui/Field'
import TextButton from '../../components/ui/TextButton'

const ChangePassword: FC = () => {
  const { t } = useTranslation()
  const { changePassword, isLoading } = useUser()
  const [data, setData] = useState<IChangePassword>({} as IChangePassword)
  const fields = [{ key: 'oldPassword' }, { key: 'newPassword' }, { key: 'confirmPassword' }]

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!data.oldPassword || !data.oldPassword.trim()) {
      errors.oldPassword = t('changePassword.oldPasswordError')
    }

    if (!data.newPassword || !data.newPassword.trim()) {
      errors.newPassword = t('changePassword.newPasswordError')
    }

    if (!data.confirmPassword || !data.confirmPassword.trim()) {
      errors.confirmPassword = t('changePassword.confirmPasswordError')
    }

    return errors
  }

  const passwordHandler = async () => {
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    await changePassword(data)
    setData({} as IChangePassword)
  }

  return (
    <View className="w-full h-full items-center bg-white pt-10">
      <View className="w-10/12">
        {fields.map((field) => (
          <Field
            key={field.key}
            value={data?.[field.key]}
            onChange={(val) => {
              setData({ ...data, [field.key]: val })
              setErrors({ ...errors, [field.key]: '' })
            }}
            label={t(`changePassword.${field.key}`)}
            isSecure={true}
            error={errors?.[field.key]}
          />
        ))}
        <TextButton
          title={t('changePassword.updateButton')}
          isLoading={isLoading}
          onPress={passwordHandler}
        />
      </View>
    </View>
  )
}

export default ChangePassword
