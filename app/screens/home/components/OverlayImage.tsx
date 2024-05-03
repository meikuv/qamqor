import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Image } from 'react-native'

interface IOverlayImageProps {
  index: number
  height: string
}

const OverlayImage: FC<IOverlayImageProps> = ({ index, height }) => {
  const { t } = useTranslation()
  const image = [
    { uri: require('../../../../assets/heart.jpeg'), text: `"${t('home.overlayOne')}"` },
    { uri: require('../../../../assets/assistance.jpeg'), text: `"${t('home.overlayTwo')}"` },
  ]

  return (
    <View className={`relative w-full ${height}`}>
      <Image source={image[index].uri} className="h-full w-full rounded-xl" resizeMode="cover" />
      <View className="absolute inset-0 w-full h-full bg-gray-900 opacity-50 rounded-xl"></View>
      <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
        <Text className="text-white text-sm font-bold text-center">{image[index].text}</Text>
      </View>
    </View>
  )
}

export default OverlayImage
