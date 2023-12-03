import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';

const Chatpage = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, message: 'Hello!', sender: 'user' },
    { id: 2, message: 'Hi there!', sender: 'other' },
    { id: 3, message: 'How are you?', sender: 'other' },
  ]);

  const sendMessage = () => {
    console.log('Message Sent:', message);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatMessages.map(chat => (
          <View key={chat.id} style={[styles.messageContainer, chat.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{chat.message}</Text>
          </View>
        ))}
      </ScrollView>
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
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#8A2BE2',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
    color:"black"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    height:"14%",
    paddingHorizontal: 15,
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
});

export default Chatpage;
