import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { createContext, useState } from 'react';
import Context from './Components/Context';

export default function App() {
  const[user,setuser]=useState({user:"",id:"",isSite:"",isAdmin:""});
  return (
    <Context.Provider value={{user,setuser}}>
      
      <Navigation/>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
