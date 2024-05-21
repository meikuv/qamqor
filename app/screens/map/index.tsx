import React, { FC, useRef, useState } from 'react'
import { Dimensions, TouchableWithoutFeedback, View, Text } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { IMapLocation } from '../../services/assistance.service'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

interface IMapProps {
  route: {
    params: {
      locations: IMapLocation[] | null
      color: string
    }
  }
}

const Map: FC<IMapProps> = ({ route }) => {
  const mapRef = useRef<MapView>(null)

  const handleMarkerPress = (place: IMapLocation) => {
    const region = {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    mapRef.current?.animateToRegion(region, 1000)
  }
  const defaultRegion = {
    latitude: 43.2551,
    longitude: 76.9126,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  }

  return (
    <MapView
      style={{ flex: 1, width: screenWidth, height: screenHeight }}
      initialRegion={defaultRegion}
      provider={PROVIDER_GOOGLE}
    >
      {route.params?.locations &&
        route.params?.locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={route.params?.color}
            onPress={() => handleMarkerPress(location)}
          >
            <Callout>
              <View className="flex justify-center items-center">
                <Text className="text-xs font-bold">{location?.locationName}</Text>
                <Text className="text-xs">{location?.locationAddress}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
    </MapView>
  )
}

export default Map
