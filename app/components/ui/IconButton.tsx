import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IIconButtonProps {
  name: string
  size: number
  color: string
  onPress: () => void
}

const IconButton: FC<IIconButtonProps> = ({ name, size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default IconButton
