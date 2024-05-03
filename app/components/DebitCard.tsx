import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'

const DebitCard = () => {
  return (
    <View className="w-72 h-40 mr-2 bg-red-100 rounded-2xl">
      <ImageBackground
        style={{
          flex: 1,
        }}
        imageStyle={{ borderRadius: 16 }}
        resizeMode="cover"
        source={{ uri: 'https://i.imgur.com/kGkSg1v.png' }}
      >
        <View className="w-full p-8">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-white">Name</Text>
              <Text className="text-white">Meirzhan K</Text>
            </View>
            <Image className="w-14 h-14" source={{ uri: 'https://i.imgur.com/bbPHJVe.png' }} />
          </View>
          <View className="pt-1">
            <Text className="text-white">Card Number</Text>
            <Text className="text-white font-medium tracking-more-wider">4642 3489 9867 7632</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default DebitCard
