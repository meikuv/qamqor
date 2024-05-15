import React, { useState } from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import IconButton from './ui/IconButton'
import { useUser } from '../hooks/useUser'
import { useTranslation } from 'react-i18next'
;``
const ImagePick = () => {
  const { t } = useTranslation()
  const { user, uploadImage } = useUser()
  const [image, setImage] = useState<any>(user.photoUrl)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      await uploadImage(result.assets[0].uri)
    }
  }

  return (
    <View className="flex items-center justify-center">
      {image ? (
        <View className="items-center">
          <Image
            source={{ uri: image }}
            className="w-24 h-24 rounded-full mb-2"
            resizeMode="cover"
          />
          <Pressable onPress={pickImage}>
            <Text style={{ textAlign: 'center', color: '#0f5645' }}>
              {t('profileUpdate.image')}
            </Text>
          </Pressable>
        </View>
      ) : (
        <IconButton name="account-circle" size={100} color={'#0284C7'} onPress={pickImage} />
      )}
    </View>
  )
}

export default ImagePick
