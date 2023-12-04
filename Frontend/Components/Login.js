import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import localhost from '../Config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErrMsg] = useState('');

  const handleLogin = async () => {
    console.log("jjjj")
    try {
      const response = await axios.post(`http://${localhost}/u/login`, {
        phoneNumber,
        password,   
      });
      

      if (response.data.message === 'success') {
        // console.log(response.data.data);
        navigation.navigate('Maintab', { "userData":response.data.data });
      } else {
        console.error('Invalid credentials');
        setErrMsg(response.data.message);

        // Clear the error message after 2 seconds
        setTimeout(() => {
          setErrMsg('');
        }, 2000);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {errmsg ? <Text style={styles.error}>{errmsg}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{flexDirection:"row",alignItems:"center",gap:20,marginTop:30}}>
        <Text>New Account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
            <Text style={{color:"blue"}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
