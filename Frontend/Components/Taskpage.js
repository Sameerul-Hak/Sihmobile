import { View, Text, Image, StyleSheet, ToastAndroid, Button } from 'react-native'
import React, { useContext } from 'react'
import taskimg from "../assets/8454.jpg";
import Context from './Context';
import Toast from 'react-native-toast-message'
import localhost from '../Config';
import axios from 'axios';

const Taskpage = ({navigation}) => {
  const showToast = (text) => {
    console.log(`toast`);
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }
  const sendRequest = async () => {
    try {
      const url = `http://${localhost}/s/sites`; 
    
      const response = await axios.post(url,{
        "user": user.id 
      });
      // console.log(response);
      showToast("Request sent successfully"); 
    } catch (error) {
      // console.log(error);
      showToast("Failed to send request!"); 
      
    }
  };

  const swithpage=()=>{
    navigation.navigate('TaskRequest');
  }


  const {user,setuser}=useContext(Context);
  return (
      <View style={styles.container}>
        {user.isSite!="true"?   <View style={styles.container}>
      <Text>{user.id}</Text>
      <Image source={taskimg} style={styles.taskimg} />
      <View style={styles.taskbox}>
        <Text style={styles.taskTitle}>Hello {user.user} :)</Text>
        <Text style={styles.task}>
          YOUR TASK!
        </Text>
        <Text style={styles.taskDescription}>
          You have to build the wall on 8th block by 5 feet within lunch.
        </Text>
        <Text style={styles.engineerInfo}>
          Site Engineer: Vinay Saran jj {"\n"}
          PhoneNumber: 9944012249
        </Text>
        <View style={styles.round}>
          <Text style={styles.completedText} onPress={sendRequest}>Request</Text>
        </View>
      </View>
    </View>:
    <View style={styles.container}>
      <Image source={taskimg} style={styles.taskimg} />
      <Button title="Check Request" onPress={swithpage}/>
    </View>}
      </View>
  )
}

const styles = StyleSheet.create({
  taskimg: {
    width: '100%',
    height: '50%', 
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  taskbox: {
    flex: 1,
    backgroundColor: '#da70d6',
    width: '100%',
    borderRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    position: 'relative',
    alignItems: "center",
    padding: 20, 
    
  },
  taskTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    
  },
  task: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    
  },
  taskDescription: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  engineerInfo: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  round: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 90,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderWidth:3,
    borderColor:"white",
    backgroundColor:"#e6e8fa"
  },
  completedText: {
    fontWeight: 'bold',
  },

})

export default Taskpage
