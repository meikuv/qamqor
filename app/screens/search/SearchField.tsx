import React, { useState, useRef } from 'react'
import { View, Text, Platform, Animated, Pressable } from 'react-native'
import Field from '../../components/ui/Field'
import { useTranslation } from 'react-i18next'

const SearchField = () => {
  const { t } = useTranslation()
  const opacityAnim = useRef(new Animated.Value(0)).current
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)
  const chips = [
    { key: 1, title: 'Volunteer' },
    { key: 2, title: 'Charity' },
    { key: 3, title: 'Medical' },
  ]

  const handlePress = () => {
    setIsOptionsVisible(!isOptionsVisible)
    Animated.timing(opacityAnim, {
      toValue: isOptionsVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const closeOptions = () => {
    setIsOptionsVisible(false)
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View className="flex-1 ml-2">
      <Field
        placeholder={t('home.search')}
        shadow={true}
        color="bg-white"
        closeIcon={Platform.OS === 'android' && isOptionsVisible}
        clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : undefined}
        onPress={handlePress}
        onClose={closeOptions}
      />
      <Animated.View
        style={{
          opacity: opacityAnim,
          transform: [
            {
              translateY: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        {isOptionsVisible && (
          <View className="absolute top-0 left-0 w-full flex-row bg-white rounded-xl mt-1 p-4 shadow-2xl shadow-gray-400">
            {chips.map((chip) => (
              <View key={chip.key} className="w-max h-max bg-gray-100 rounded-full p-2 mr-2">
                <Text className="text-xs">{chip.title}</Text>
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  )
}

export default SearchField
