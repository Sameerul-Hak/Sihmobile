import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Safetypage = ({ navigation }) => {
  const [message, setMessage] = useState('');

  const [adminmes,setadminmes]=useState(["sam",'son','rom'])
  const sendmethod = () => {
    alert('Message sent');
  };

  const goToAdminMessages = () => {
    navigation.navigate('Adminmessages');
  };

  return (
    <View style={styles.cont}>
      <View style={styles.safety}>
        <TouchableOpacity onPress={goToAdminMessages}>
          <Text style={adminmes.length!=0?styles.messageiruku:styles.messageilla}>{` ${adminmes.length} Messages from Admin`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textinput}>
        <TextInput
          value={message}
          placeholder='Chat with admin...'
          onChangeText={(text) => setMessage(text)}
          multiline={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendmethod}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  textinput: {
    flex: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safety: {
    flex: 0.9,
  },
  input: {
    width: '90%',
    flex: 1,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  sendButton: {
    borderRadius: 25,
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 2,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageiruku:{
    color:"red",
    alignSelf:"flex-end",
    fontSize:15,
    padding:10,
  },
  messageilla:{
    color:"black",
    fontSize:15,
    alignSelf:"flex-end"
  }
});

export default Safetypage;
