import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { IUser } from '../../../services/user.service'
import { useNavigation } from '@react-navigation/native'
import UserImage from '../../../components/UserImage'

interface IHeaderProps {
  user: IUser | undefined
}

const Header: FC<IHeaderProps> = ({ user }) => {
  const navigation = useNavigation()

  return (
    <View className="w-full h-32 items-center justify-center rounded-b-2xl bg-sky-700">
      <Pressable
        onPress={() => navigation.navigate('ProfileUpdate')}
        className="w-11/12 pt-5 flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <UserImage />
          <View className="ml-8">
            <Text className="text-lg font-medium text-white">
              {user?.lastName && user?.firstName
                ? `${user?.lastName} ${user?.firstName}`
                : user?.username}
            </Text>
            <Text className="text-xs text-white">{user?.email}</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={15} color={'white'} />
      </Pressable>
    </View>
  )
}

export default Header
