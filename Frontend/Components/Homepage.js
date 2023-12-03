import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

const Homepage = ({ navigation }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month - 1, 1).getDay();

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = [
      "January", "February", "March", "April", "May", "June",
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
            <Text>{getMonthName(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}</Text>
          </TouchableOpacity>
          <Text>{getMonthName(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text>{getMonthName(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}</Text>
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
    <SafeAreaView style={styles.container}>
      {renderCalendar()}
    </SafeAreaView>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    paddingTop: 5,
  },
});

export default Homepage;
