import React, { FC, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import Field from '../../../../components/ui/Field'

export interface IHistoryItemProps {
  route: {
    params: {
      help: any
    }
  }
}

const HistoryItem: FC<IHistoryItemProps> = ({ route }) => {
  const { t } = useTranslation()
  const { help } = route.params
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: `${t('history.request')}: №${help?.id}`,
    })
  }, [navigation, help])

  return (
    <DefaultLayout isScrollView={false}>
      <View className="mx-2">
        <Field
          value={help.type === 'needHelp' ? help?.supportType : help?.age.toString()}
          label={t(
            `volunteer.${help.type === 'needHelp' ? 'needHelp.supportType' : 'canHelp.age'}`
          )}
          isDisabled={true}
          shadow={true}
        />
        <Field
          value={help.type === 'needHelp' ? help?.expand : help?.motivation}
          label={t(
            `volunteer.${help.type === 'needHelp' ? 'needHelp.expand' : 'canHelp.motivation'}`
          )}
          isDisabled={true}
          isTextArea={true}
          shadow={true}
        />
      </View>
    </DefaultLayout>
  )
}

export default HistoryItem
