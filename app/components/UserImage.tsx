import React, { FC } from 'react'
import { Image } from 'react-native'
import { useUser } from '../hooks/useUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IUserImageProps {
  imageStyle?: string
  iconSize?: number
}

const UserImage: FC<IUserImageProps> = ({ imageStyle, iconSize }) => {
  const { user } = useUser()

  return (
    <>
      {user.photoUrl ? (
        <Image
          source={{ uri: user.photoUrl }}
          className={imageStyle ? imageStyle : 'w-20 h-20 rounded-full'}
          resizeMode="cover"
        />
      ) : (
        <Icon name="account-circle" size={iconSize ? iconSize : 55} color={'white'} />
      )}
    </>
  )
}

export default UserImage
