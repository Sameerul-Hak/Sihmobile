import { View, Text, Button } from 'react-native'
import React from 'react'

const Homepage = ({navigation}) => {
  return (
    <View>
      <Text>Homepage</Text>
      <Button title='alert iruntha' onPress={()=>navigation.navigate("Alert")}/>
    </View>
  )
}

export default Homepage