import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import localhost from '../Config';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErrMsg] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`http://${localhost}:8000/u/register`, {
        name,
        phoneNumber,
        email,
        password,
      });

      if (response.data.message === 'sucess') {
        navigation.navigate('Maintab', { userData: response.data.data });
          } else {
        console.error('Registration failed');
        setErrMsg(response.data.message);

        // Clear the error message after 2 seconds
        setTimeout(() => {
          setErrMsg('');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      {errmsg ? <Text style={styles.error}>{errmsg}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <View style={{flexDirection:"row",alignItems:"center",gap:20,marginTop:30}}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
            <Text style={{color:"blue"}}>Login</Text>
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

export default Register;
