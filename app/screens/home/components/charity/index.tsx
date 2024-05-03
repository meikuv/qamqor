import React, { FC } from 'react'
import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import { IAssistance } from '../../../../services/assistance.service'
import DebitCard from '../../../../components/DebitCard'

interface ICharityProps {
  route: {
    params: {
      charity: IAssistance // Define the type of charity object here
    }
  }
}

const Charity: FC<ICharityProps> = ({ route }) => {
  const { charity } = route.params

  return (
    <DefaultLayout isScrollView={true} bgColor="bg-white">
      <View className="flex-1">
        <View className="h-32 overflow-hidden">
          <Image
            source={require('../../../../../assets/hands.jpg')}
            className="w-full h-full rounded-b-xl"
            resizeMode="cover"
          />
        </View>
        <View className="flex justify-center items-center -mt-14">
          <View className="bg-white p-2 rounded-full">
            <Image source={{ uri: charity.photoUrl }} className="h-32 w-32 bg-white rounded-full" />
          </View>
        </View>
        <View>
          <View className="items-center mx-5">
            <Text className="text-center text-2xl font-medium">{charity.name}</Text>
          </View>
          <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 mt-2 p-4">
            <Text className="text-base font-medium">О фонде</Text>
            <Text className="text-xs mt-2">{charity.descriptionRU}</Text>
          </View>
          <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 p-4">
            <Text className="text-base font-medium">Цель</Text>
            {charity.charityDirections &&
              charity.charityDirections.map((direction) => (
                <Text key={direction.id} className="text-xs">{`\u2023 ${direction.title}`}</Text>
              ))}
          </View>
          <View className="h-max bg-white rounded-xl shadow-md shadow-gray-400 mx-5 my-2 py-4 pl-4">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <DebitCard />
              <DebitCard />
            </ScrollView>
          </View>
        </View>
      </View>
    </DefaultLayout>
  )
}

export default Charity

{
  /* {charity.contact.websiteUrl && (
              <View className="flex-row justify-between">
                <Text>Сайт:</Text>
                <Text>{charity.contact.websiteUrl}</Text>
              </View>
            )}
            {charity.contact.email && (
              <View className="flex-row justify-between">
                <Text>Почта: </Text>
                <Text>{charity.contact.email}</Text>
              </View>
            )}
            {charity.contact.phone && (
              <View className="flex-row justify-between">
                <Text>Телефон: </Text>
                <Text>{charity.contact.phone}</Text>
              </View>
            )}
            {charity.contact.address && (
              <View className="flex-row justify-between">
                <Text>Адресс: </Text>
                <Text>{charity.contact.address}</Text>
              </View>
            )} */
}
