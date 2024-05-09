import React, { FC } from 'react'
import { View, Text, Image, ImageBackground, Pressable, Linking } from 'react-native'
import { IRequisites } from '../services/assistance.service'

interface IDebitCardProps {
  debitCardProps: IRequisites
}

const DebitCard: FC<IDebitCardProps> = ({ debitCardProps }) => {
  return (
    <View className="w-72 h-max mr-2 bg-red-100 rounded-2xl">
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
              <Text className="text-white">{debitCardProps.respondent}</Text>
            </View>
            <Image className="w-14 h-14" source={{ uri: 'https://i.imgur.com/bbPHJVe.png' }} />
          </View>
          <View className="pt-1">
            <Text className="text-white">Account Number</Text>
            {debitCardProps.onlinePaymentUrl && (
              <Pressable onPress={() => Linking.openURL(`${debitCardProps.onlinePaymentUrl}`)}>
                <Text className="text-white">{debitCardProps.onlinePaymentUrl}</Text>
              </Pressable>
            )}
            {debitCardProps.accountNumber && (
              <Text className="text-white font-medium tracking-more-wider">
                {debitCardProps.accountNumber}
              </Text>
            )}
            {debitCardProps.currency && (
              <Text className="text-white">{debitCardProps.currency}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default DebitCard
