import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const AdminMessage = () => {
  const [adminMessages, setAdminMessages] = useState([
    { id: 1, message: 'This is an admin message 1', createdAt: '2023-12-01T12:30:45' },
    { id: 2, message: 'This is an admin message 2', createdAt: '2023-12-02T09:15:00' },
    // Add more messages here...
  ]);

  // Function to calculate time difference in minutes
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

  const handleDelete = (id) => {
    // Handle deletion of the message with the given ID
    const updatedMessages = adminMessages.filter((message) => message.id !== id);
    setAdminMessages(updatedMessages);
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
          <TouchableOpacity onPress={() => handleDelete(message.id)}>
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
