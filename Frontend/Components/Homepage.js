
import React, { useState ,useRef ,useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';

import wareHouseIcon from '../assets/Vectorware.png'
import firstAidIon from '../assets/firstAid.png'
import RestroomIcon from '../assets/restroom.png'
import machineryIcon from '../assets/machinery.png'

const Homepage = ({ navigation,route }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isFullView, setIsFullView] = useState(true);
  const [nearbyLocation, setNearbyLocations] = useState([]);
  const mapRef = useRef(null);

  const warehoueIcon = require('../assets/Vectorware.png')
  console.log("home page",route.params.userData);
 let loc  = null;




  const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    
  };
   let nearbyLocations = null;
  

  const handleMyLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (mapRef.current && location) {
        loc = location;
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        });
         nearbyLocations = [
          { latitude: loc?.coords?.latitude+0.00005, longitude: loc?.coords?.longitude+0.00006 },
          { latitude: loc?.coords?.latitude-0.00011, longitude: loc?.coords?.longitude+0.00012 },
          { latitude: loc?.coords?.latitude-0.00008, longitude: loc?.coords?.longitude-0.00011 },
          { latitude: loc?.coords?.latitude+0.00015, longitude: loc?.coords?.longitude-0.00012 },
          
        ];
        setNearbyLocations(nearbyLocations);
        console.log(location.coords.latitude,location.coords.longitude,nearbyLocations)
        
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  console.log(loc)
   
  console.log(loc)
  console.log(nearbyLocations)

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

   useEffect(() => {
    handleMyLocation(); // Get user's location on component mount
    // You may want to add further logic or dependencies for this effect if necessary
  }, []);

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
          customMapStyle={customMapStyle}
        >
         {nearbyLocation && nearbyLocation.length > 0 &&
            nearbyLocation.map((marker, index) => {
              console.log("Marker:", marker); // Log the marker here
              let iconImage ;
                switch (index) {
                  case 0:
                    iconImage = wareHouseIcon;
                    break;
                  case 1:
                    iconImage = firstAidIon;
                    break;
                  case 2:
                    iconImage = RestroomIcon;
                    break;
                  case 3:
                    iconImage = machineryIcon;
                    break;
}
              return (
                <Marker key={index} coordinate={marker} icon={iconImage}/>
              );
            })}
        </MapView>
        
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
    paddingTop: Platform.OS === 'android' ? 5 : 0,
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
    borderBottomWidth:2,
    borderBottomColor:'#D3D3D3'
    
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
    fontSize:16,
    color:'#E5E4E2'
  },
  currMonth:{
    fontSize:20,
    color:'#9E6EB1'

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
    bottom: 6,
    left: 5,
    backgroundColor: "#87CEEB",
    color:"#000",
    padding: 8,
    borderRadius: 5,
    elevation: 3,
  },
  toggleText: {
    fontSize: 15,
  },
  headerText:{
    fontSize:23,
    marginBottom:5,
    fontFamily:'bold',
    color:'#630330'

  }
});

export default Homepage;
