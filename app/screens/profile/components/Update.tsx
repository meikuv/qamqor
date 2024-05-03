import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { IUser } from '../../../services/user.service'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../../hooks/useUser'
import DefaultLayout from '../../../components/layout/DefaultLayout'
import Field from '../../../components/ui/Field'
import TextButton from '../../../components/ui/TextButton'
import ImagePick from '../../../components/ImagePick'

const Update: FC = () => {
  const { t } = useTranslation()
  const { user, updateUser, isLoading } = useUser()
  const [data, setData] = useState<IUser>(user)

  const updateHandler = async () => {
    await updateUser(data)
  }

  const fields = [
    { key: 'username', isDisabled: true },
    { key: 'email', isDisabled: true },
    { key: 'firstName' },
    { key: 'lastName' },
    { key: 'phoneNumber' },
  ]

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
      <View className="items-center pt-10">
        <View className="w-10/12">
          <ImagePick />
          {fields.map((field) => (
            <Field
              key={field.key}
              onChange={(val) => setData({ ...data, [field.key]: val })}
              value={data?.[field.key]}
              isSecure={false}
              isDisabled={field.isDisabled}
              label={t(`profileUpdate.${field.key}`)}
            />
          ))}
          <TextButton
            onPress={updateHandler}
            isLoading={isLoading}
            title={t('profileUpdate.updateButton')}
          />
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Update
