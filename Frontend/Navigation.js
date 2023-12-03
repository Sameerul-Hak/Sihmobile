import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text, Touchable, TouchableOpacity, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Chatpage from './Components/Chatpage';
import Requirement from './Components/Requirement';
import Taskpage from './Components/Taskpage';
import Safetypage from './Components/Safetypage';
import Homepage from './Components/Homepage';
import Alertpage from './Components/Alertpage';

// function HomeScreen({navigation}) {

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Settings')}
//       />    
//     </View>
//   );
// }


const Stack = createStackNavigator();

function MyHomeStack() {
  return (
    <Stack.Navigator screenOptions={
        {
            headerShown:false,
        }
    }>
      <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Alert" component={Alertpage}/>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={
        {
            headerShownVisible:false,
            // headerShownVisible:false
        }
      }>
        <Tab.Screen name="Chat" component={Chatpage} />
        <Tab.Screen name="Task" component={Taskpage} />
        <Tab.Screen name="Home" component={MyHomeStack} />
        <Tab.Screen name="Requirements" component={Requirement} />
        <Tab.Screen name="Safety" component={Safetypage} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}