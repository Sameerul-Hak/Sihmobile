
import React, { useState ,useRef} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';

const Homepage = ({ navigation }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
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

  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month - 1, 1).getDay();

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = [
      "January", "Febr", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

  
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonthDate);
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonthDate);
  };

  const getMonthName = (date) => {
    
    return monthNames[date.getMonth()];
  };

  const renderCalendar = () => {
    return (
      <View style={styles.card}>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.month}>{getMonthName(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}</Text>
          </TouchableOpacity>
          <Text style={styles.currMonth}>{getMonthName(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.month}>{getMonthName(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.daysHeader}>
          {days.map(day => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {Array.from({ length: startDay }, (_, index) => (
            <Text key={`empty-${index}`} style={styles.emptyDay}></Text>
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => (
            <Text key={`day-${index}`} style={styles.calendarDay}>{index + 1}</Text>
          ))}
        </View>
      </View>
    );
  };

  return (

    <View style={styles.container}>
      <View style={styles.container}>
      {isFullView && (
        <View >
          {renderCalendar()}
        </View>
      )}
      </View>
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

export default Homepage;
