import React, { useState, useRef, useEffect, useMemo } from 'react'
import { View, Text, Platform, Animated, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import Field from '../../components/ui/Field'
import debounce from 'lodash.debounce'
import assistanceService from '../../services/assistance.service'

const SearchField = () => {
  const { t } = useTranslation()
  const opacityAnim = useRef(new Animated.Value(0)).current
  const [items, setItems] = useState<any>([])
  const [search, setSearch] = useState<string | null>(null)
  const [searchType, setSearchType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)
  const chips = [
    { key: 1, title: 'volunteer' },
    { key: 2, title: 'charity' },
    { key: 3, title: 'lawyer' },
  ]

  const handlePress = () => {
    setIsOptionsVisible(true)
    Animated.timing(opacityAnim, {
      toValue: 1,
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
    setSearchType('')
    setSearch('')
    setItems([])
  }

  const handleChange = async (val: string) => {
    setSearch(val)
    if (val && searchType) {
      setIsLoading(true)
      console.log(val, searchType)
      searchByName(searchType, val)
        .then((items) => setItems(items))
        .catch((error) => {
          console.error('Error:', error)
          setItems([])
        })
        .finally(() => setIsLoading(false))
    } else {
      setItems([])
      return
    }
    console.log(items)
  }

  const searchByName = async (type: string, name: string) => {
    try {
      const { data } = await assistanceService.searchAssistance(type.trim(), name.trim())
      console.log(data)
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      return []
    }
  }

  const debouncedResults = useMemo(() => {
    return debounce((val: string) => handleChange(val), 250)
  }, [search, searchType])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

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
        onChange={(val) => debouncedResults(val)}
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
          <View className="absolute top-0 left-0 w-max flex-wrap flex-row bg-white rounded-xl mt-1 px-2 shadow-2xl shadow-gray-400">
            {chips.map((chip) => (
              <Pressable
                key={chip.key}
                onPress={() => setSearchType(chip.title)}
                className={`w-max items-center justify-center ${
                  searchType === chip.title ? 'bg-sky-700' : 'bg-gray-100'
                } rounded-full p-2 mr-2 my-2`}
              >
                <Text className={`text-xs ${searchType === chip.title ? 'text-white' : null}`}>
                  {t(`search.${chip.title}`)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  )
}

export default SearchField
