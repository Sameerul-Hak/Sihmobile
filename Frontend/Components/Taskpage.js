import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import taskimg from "../assets/8454.jpg";
import Context from './Context';

const Taskpage = () => {
  const {user,setuser}=useContext(Context);
  return (
    <View style={styles.container}>
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
          <Text style={styles.completedText}>Request</Text>
        </View>
      </View>
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
