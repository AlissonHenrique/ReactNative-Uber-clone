import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import Directions from '../Directions'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function Map() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
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

  async function handeleLocatioSelected({ geometry }) {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    setDestination({
      destination: {
        latitude,
        longitude,
        // title: data.structured_formatting.main_text
      }
    });
    console.log(geometry)
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
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Para onde ?"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={region}
          onChangeText={setRegion}
        />
        <TouchableOpacity onPress={handeleLocatioSelected} style={styles.loadButton}>
          <Text>
            <MaterialIcons name="my-location" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#7d40e7",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
})