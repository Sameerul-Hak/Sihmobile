import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import localhost from '../Config';
import Context from './Context';
import { ToastAndroid } from 'react-native';

const TaskRequest = () => {
  const [requests, setRequests] = useState([]);
  const {user,setuser}=useContext(Context);

  useEffect(() => {
    // Fetch the requests data from the server
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://${localhost}/s/sites`); // Replace with your endpoint
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleDeleteRequest = async (id) => {
    try {
      await axios.delete(`http://${localhost}/s/sites/${id}`); // Replace with your delete endpoint
      // Remove the deleted request from the local state
      setRequests(requests.filter((request) => request._id !== id));
      ToastAndroid.show("Deleted Sucessfully", ToastAndroid.SHORT);
    } catch (error) {
        console.error('Error deleting request:', error);
        ToastAndroid.show("Error occured your message will be deleted", ToastAndroid.SHORT);

    }
  };
  const handlecompleteRequest = async (id) => {
    try {
      await axios.post(`http://${localhost}/s/sites/${id}`); // Replace with your delete endpoint
      // Remove the deleted request from the local state
      ToastAndroid.show("Updated Sucessfully", ToastAndroid.SHORT);
    } catch (error) {
        console.error('Error deleting request:', error);
        ToastAndroid.show("Error occured your message will be updated", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((request) => (
        <View style={styles.requestContainer} key={request._id}>
          <Text style={styles.userName}>User: {request.user.name}</Text>
          <Text>Date: {new Date(request.createdAt).toLocaleDateString()}</Text>
          <Text>Time: {new Date(request.createdAt).toLocaleTimeString()}</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <TouchableOpacity onPress={() => handleDeleteRequest(request._id)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handlecompleteRequest(request._id)}>
            <Text style={styles.updatebtn}>Complete Request</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  requestContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    color:"white",
    backgroundColor:"orange",
    padding:10,
    width:"100%",
    fontWeight:"600"
},
updatebtn:{
    color:"white",
    padding:10,
    backgroundColor:"green",
    width:"100%",
    fontWeight:"600"
  }
});

export default TaskRequest;
