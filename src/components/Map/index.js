import React, { useEffect, useState } from 'react';

import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
export default function Map() {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitPosition()

  }, [])

  if (!currentRegion) {
    return null;
  }
  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
        latitudeDelta: currentRegion.latitudeDelta,
        longitudeDelta: currentRegion.longitudeDelta
      }}
      showsUserLocation
      loadingEnabled
    >

    </MapView>
  );
}
