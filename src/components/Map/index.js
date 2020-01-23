import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Search from '../Search'
//import Directions from '../Directions'

export default function Map() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [destination, setDestination] = useState(null);
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

  async function handeleLocatioSelected(data, { geometry }) {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    setDestination({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  }
  return (
    <>
      <MapView
        style={{ flex: 1 }}
        region={currentRegion}
        showsUserLocation
        loadingEnabled
      >
        {/* {destination && (
          <Directions
            origin={region}
            destination={destination}
            onReady={result => {
              this.setState({ duration: Math.floor(result.duration) });

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: getPixelSize(50),
                  left: getPixelSize(50),
                  top: getPixelSize(50),
                  bottom: getPixelSize(350)
                }
              });
            }}
          />
        )} */}
      </MapView>
      <Search onLocationSelected={handeleLocatioSelected} />
    </>
  );
}
