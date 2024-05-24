import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../../../hooks/useAssistance'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../../../hooks/useUser'
import { formatDate, formatTime } from '../../../../utils/dateUtils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import IconButton from '../../../../components/ui/IconButton'

const HistoryList = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { combinedHelpList, getAllCanHelp, getAllNeedHelp } = useAssistance()

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getAllCanHelp(user.username)
      await getAllNeedHelp(user.username)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <DefaultLayout isScrollView={true} refreshing={refreshing} onRefresh={onRefresh}>
      <View className="flex-1 mx-2">
        {combinedHelpList?.length !== 0 &&
          combinedHelpList?.map((help) => (
            <View key={help.id} className="flex-col items-center justify-center my-2">
              <Text className="bg-[#0f5645] p-2 rounded-full text-[#FFFFE0] text-xs">
                {formatDate(help.createdAt)}
              </Text>
              <View className="w-full bg-[#FFFFE0] rounded-xl shadow shadow-black mt-2 px-4 py-2">
                <View className="flex-row justify-between items-center">
                  <Text className="w-11/12 text-base font-bold text-[#0f5645]">
                    {help.organization}
                  </Text>
                  <Text className="flex-wrap text-xs text-[#0f5645]">
                    {formatTime(help.createdAt)}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center">
                    <Icon name="clock-time-eight" size={25} color="#DEB887" />
                    <Text className="ml-2 text-sm text-[#0f5645] font-normal">
                      {help.type === 'canHelp'
                        ? t('volunteer.canHelp.title')
                        : t('volunteer.needHelp.title')}
                    </Text>
                  </View>
                  <IconButton
                    name="chevron-right"
                    size={30}
                    color="#0f5645"
                    onPress={() => navigation.navigate('HistoryItem', { help: help })}
                  />
                </View>
              </View>
            </View>
          ))}
      </View>
    </DefaultLayout>
  )
}

export default HistoryList
