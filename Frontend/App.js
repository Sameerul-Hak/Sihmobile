import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { createContext, useState } from 'react';
import Context from './Components/Context';

export default function App() {
  const[user,setuser]=useState({user:"",id:""});
  return (
    <Context.Provider value={{user,setuser}}>
      <Navigation/>
    </Context.Provider>
  );
}
// 5d83504b-7593-4acb-af8b-e155b6fd221b
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
