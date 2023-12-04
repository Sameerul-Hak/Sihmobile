import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const Requirement = () => {
  const mapRef = useRef(null);
  const [isFullView, setIsFullView] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.007, // Initial latitudeDelta for default zoom
    longitudeDelta: 0.007, // Initial longitudeDelta for default zoom
  });

  const toggleView = () => {
    setIsFullView(!isFullView);
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
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  useEffect(() => {
    handleMyLocation(); // Get user's location on component mount
    // You may want to add further logic or dependencies for this effect if necessary
  }, []);

  const customMapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {isFullView && (
          <View>
            {/* Your calendar component */}
          </View>
        )}
      </View>
      <View style={isFullView ? styles.mapContainer : styles.mapContainerFull}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={mapRegion}
          showsUserLocation
          customMapStyle={customMapStyle}
        >
          {userLocation && <Marker coordinate={userLocation} />}
          {/* Other markers */}
        </MapView>
        <TouchableOpacity onPress={toggleView} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{isFullView ? 'Full View' : 'Back'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal:10
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    width: '14.28%',
    height: 30,
  },
  calendarDay: {
    width: '14.28%',
    height: 30,
    textAlign: 'center',
   
    borderRadius: 5,
    marginBottom: 5,
    paddingTop: 5,
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  month:{
    fontSize:16
  },
  currMonth:{
    fontSize:20,
  },
  mapContainer: {
    width: "94%",
    height: "50%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    position: "relative",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom:18
  },
  mapContainerFull: {
    width: "100%",
    height: "90%",
    backgroundColor: "#F5F5F5",
    position: "relative",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom:5
    
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




export default Requirement;
