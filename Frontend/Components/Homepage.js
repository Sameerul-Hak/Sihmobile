import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';


const Homepage = ({ navigation }) => {
  const [isFullView, setIsFullView] = useState(true);
  const mapRef = useRef(null);

  const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };
  

  const handleMyLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (mapRef.current && location) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const nearbyLocations = [
    { latitude: 37.35, longitude: -122.03 },
    { latitude: 37.34, longitude: -122.02 },
    { latitude: 37.32, longitude: -122.01 },
    { latitude: 37.33, longitude: -122.05 },
    { latitude: 37.36, longitude: -122.0 },
  ];

  const toggleView = () => {
    setIsFullView((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={isFullView ? styles.mapContainer : styles.mapContainerFull}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
        >
          {nearbyLocations.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={handleMyLocation}
        >
          <Text>My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleView} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{isFullView ? "Full View" : "Back"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  mapContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "#F5F5F5",
    borderRadius: 2,
    position: "relative",
  },
  mapContainerFull: {
    width: "100%",
    height: "90%",
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  myLocationButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    elevation: 3,
  },
  toggleButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    elevation: 3,
  },
  toggleText: {
    fontSize: 15,
  },
});

export default Homepage;
