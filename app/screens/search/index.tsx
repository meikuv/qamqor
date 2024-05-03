import React, { FC, useState } from 'react'
import SafeLayout from '../../components/layout/SafeLayout'
import SearchField from './SearchField'
import { View } from 'react-native'
import IconButton from '../../components/ui/IconButton'
import { useNavigation } from '@react-navigation/native'

const Search: FC = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState<string>('')

  return (
    <SafeLayout style="bg-white">
      <View className="w-full">
        <View className="flex-row items-center justify-between px-4">
          <IconButton
            name="arrow-left"
            size={25}
            color="rgb(2, 132, 199)"
            onPress={() => navigation.navigate('Home')}
          />
          <SearchField />
        </View>
      </View>
    </SafeLayout>
  )
}

export default Search
