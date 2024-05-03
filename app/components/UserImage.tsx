import React from 'react'
import { Image } from 'react-native'
import { useUser } from '../hooks/useUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const UserImage = () => {
  const { user } = useUser()

  return (
    <>
      {user.photoUrl ? (
        <Image
          source={{ uri: user.photoUrl }}
          className="w-20 h-20 rounded-full"
          resizeMode="cover"
        />
      ) : (
        <Icon name="account-circle" size={55} color={'white'} />
      )}
    </>
  )
}

export default UserImage
