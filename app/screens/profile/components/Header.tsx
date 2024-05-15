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
    <View
      style={{ backgroundColor: '#0f5645' }}
      className="w-full h-32 items-center justify-center rounded-b-2xl"
    >
      <Pressable
        onPress={() => navigation.navigate('ProfileUpdate')}
        className="w-11/12 pt-5 flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <UserImage />
          <View className="ml-8">
            <Text style={{ color: '#DEB887' }} className="text-lg font-medium">
              {user?.lastName && user?.firstName
                ? `${user?.lastName} ${user?.firstName}`
                : user?.username}
            </Text>
            <Text style={{ color: '#DEB887' }} className="text-xs">
              {user?.email}
            </Text>
          </View>
        </View>
        <Icon name="chevron-right" size={15} color={'#DEB887'} />
      </Pressable>
    </View>
  )
}

export default Header
