import React, { FC, useMemo, useState } from 'react'
import { Image, Text, Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import debounce from 'lodash.debounce'
import SafeLayout from '../../components/layout/SafeLayout'
import SearchField from './SearchField'
import IconButton from '../../components/ui/IconButton'

const Search: FC = () => {
  const navigation = useNavigation()
  const [results, setResults] = useState<any[]>([])
  const [resultType, setResultType] = useState<string | null>(null)

  const getResults = (items: any[], type: string | null) => {
    setResults(items)
    setResultType(type)
  }

  const debouncedResults = useMemo(() => {
    return debounce(getResults, 250)
  }, [results, resultType])

  return (
    <SafeLayout style="bg-white">
      <View className="w-full">
        <View className="flex-row items-center justify-between px-4">
          <IconButton
            name="arrow-left"
            size={25}
            color="#0f5645"
            onPress={() => navigation.navigate('Home')}
          />
          <SearchField getResults={debouncedResults} />
        </View>
        <View className="mt-16">
          {results.length !== 0 &&
            results.map((item: any) => (
              <Pressable
                key={item.id}
                style={{ backgroundColor: '#FFFFE0' }}
                className={`flex-row items-center bg-white rounded-xl mb-2 mx-6 p-2 shadow-sm-2xl shadow-black`}
                onPress={() => {
                  if (resultType === 'lawyer') {
                    navigation.navigate('Law', { scrollToIndex: item.id })
                  } else {
                    navigation.navigate('Assistance', {
                      assistance: item,
                      imageIndex: resultType === 'charity' ? 0 : 1,
                    })
                  }
                }}
              >
                <Image source={{ uri: item.photoUrl }} className="w-14 h-14 rounded-full" />
                <View className="flex-1 ml-4">
                  <Text style={{ color: '#0f5645' }} className="text-base font-semibold">
                    {item.name}
                  </Text>
                  {item.contact?.email && (
                    <Text style={{ color: '#0f5645' }} className="text-sm">
                      {item.contact.email}
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
        </View>
      </View>
    </SafeLayout>
  )
}

export default Search
