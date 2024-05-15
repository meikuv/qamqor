import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface ITextLinkProps {
  title: string
  iconName: string
  iconColor?: string
  textColor?: string
  onPress: () => void
}

const TextLink: FC<ITextLinkProps> = ({ title, iconName, iconColor, textColor, onPress }) => {
  return (
    <Pressable onPress={onPress} className="w-full flex-row items-center justify-between mb-5">
      <View className="flex-row items-center">
        <Icon name={iconName} size={25} color={iconColor ? iconColor : '#DEB887'} />
        <Text
          style={{ color: `${textColor ? textColor : '#DEB887'}` }}
          className="text-base text-sky-700 ml-4"
        >
          {title}
        </Text>
      </View>
      <Icon name="chevron-right" size={15} color={iconColor ? iconColor : '#DEB887'} />
    </Pressable>
  )
}

export default TextLink
