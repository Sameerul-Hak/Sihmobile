import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
import axios from 'axios';
import localhost from '../Config';
import moment from 'moment';

const Chatpage = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const flatListRef = useRef(null);

  useEffect(() => {
    axios.get(`http://${localhost}:8000/m/message`)
      .then(response => {
        setChatMessages(response.data.msg.reverse());
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const sendMessage = () => {
    const username = 'sameer';

    if (message.trim() !== '') {
      axios.post(`http://${localhost}:8000/m/message`, { name: username, message })
        .then(response => {
          setChatMessages([{ name: username, message }, ...chatMessages]);
          setMessage('');
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    } else {
      console.warn('Message cannot be empty');
    }
  };

  const renderTime = (createdAt) => {
    const timeAgo = moment(createdAt).fromNow();
    return timeAgo;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={chatMessages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.name === 'sameer' ? styles.userMessage : styles.otherMessage]}>
            <View style={styles.messageHeader}>
              <Text style={item.name === "sameer" ? styles.userName : styles.nonuserName}>{item.name}</Text>
              <Text style={styles.timeText}>{renderTime(item.createdAt)}</Text>
            </View>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
        inverted
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type your message..."
          multiline={true}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  nonuserName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#8A2BE2',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    color:'white',
    elevation: 2,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#8A2BE2',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    backgroundColor: '#ffffff',
    maxHeight: 150,
    fontSize: 16,
    color: '#000000',
  },
  sendButton: {
    marginLeft: 10,
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
  timeText: {
    color: 'black',
    paddingHorizontal:10,
    fontSize: 12,
  },
});

export default Chatpage;
