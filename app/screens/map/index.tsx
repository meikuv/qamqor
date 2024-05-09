import React, { FC } from 'react'
import { Dimensions, TouchableWithoutFeedback, View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

interface IRegion {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

interface IMap {
  region: IRegion
}

const Map: FC<IMap> = ({ region }) => {
  const defaultRegion = {
    latitude: 43.2551,
    longitude: 76.9126,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  }

  return (
    <MapView
      style={{ flex: 1, width: screenWidth, height: screenHeight }}
      initialRegion={region || defaultRegion}
      provider={PROVIDER_GOOGLE}
    >
      <Marker
        coordinate={{
          latitude: 51.1605,
          longitude: 71.4704,
        }}
        title="Astana"
        description="Capital city of Kazakhstan"
      >
        <TouchableWithoutFeedback onPress={() => alert('Astana Marker Pressed')}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
            <Text>Astana</Text>
          </View>
        </TouchableWithoutFeedback>
      </Marker>

      <Marker
        coordinate={{
          latitude: 43.222,
          longitude: 76.8512,
        }}
        title="Almaty"
        description="Major city in Kazakhstan"
      >
        <TouchableWithoutFeedback onPress={() => alert('Almaty Marker Pressed')}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
            <Text>Almaty</Text>
          </View>
        </TouchableWithoutFeedback>
      </Marker>
    </MapView>
  )
}

export default Map
