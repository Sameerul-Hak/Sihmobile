import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import Context from './Context';
import axios from 'axios';
import localhost from '../Config';

const AdminMessage = () => {
  const [adminMessages, setAdminMessages] = useState([]);
  const {user,setuser}=useContext(Context);

  useEffect(()=>{
    axios.get(`http://${localhost}/a/getmessage/${user.id}`).then((res)=>{
      setAdminMessages(res.data);
      console.log(res.data);
    })
  },[])

  const calculateTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const messageTime = new Date(createdAt);
    const differenceInMilliseconds = currentTime - messageTime;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
  
    if (differenceInMinutes < 1) {
      return 'Just now';
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes} mins ago`;
    } else {
      return `${differenceInHours} ${differenceInHours === 1 ? 'hour ago' : 'hours ago'}`;
    }
  };

  const handleDelete = (ids) => {
    console.log(ids);
    axios.post(`http://${localhost}/a/deletemsgfromuser`,{"userid":user.id,"messageid":ids} ).then((res)=>{
      alert("deleted Admin message.")
      const updatedMessages = adminMessages.filter((message) => message._id !== ids);
      setAdminMessages(updatedMessages);
    }).catch((e)=>{
      console.log(e);
      alert("Error Occured while Deleting");
    })
    // console.log(adminMessages);
  };

  return (
    <View style={styles.container}>
      {adminMessages.map((message) => (
        <View key={message.id} style={styles.messageContainer}>
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{message.message}</Text>
            <Text style={styles.createdAt}>
              {calculateTimeDifference(message.createdAt)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(message._id)}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  createdAt: {
    fontSize: 12,
    color: 'gray',
  },
});

export default AdminMessage;
