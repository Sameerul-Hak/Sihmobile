import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library
import Chatpage from './Components/Chatpage';
import Requirement from './Components/Requirement';
import Taskpage from './Components/Taskpage';
import Safetypage from './Components/Safetypage';
import Homepage from './Components/Homepage';
import Alertpage from './Components/Alertpage';
import AdminMessage from './Components/AdminMessage';

const Stack = createStackNavigator();

function MyHomeStack() {
  return (
    <Stack.Navigator screenOptions={
      {
        headerShown: false,
      }
    }>
      <Stack.Screen name="Home" component={Homepage} />
      <Stack.Screen name="Alert" component={Alertpage}/>
      
    </Stack.Navigator>
  );
}
function MysafetyStack() {
  return (
    <Stack.Navigator screenOptions={
      {
        headerShown: false,
      }
    }>
      <Stack.Screen name="Safety" component={Safetypage} />
      <Stack.Screen name="Adminmessages" component={AdminMessage}/>      
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
              
            if (route.name === 'Chat') {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            } else if (route.name === 'Task') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Requirements') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Safety') {
              iconName = focused ? 'shield' : 'shield-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray', 
        }}
      >
        <Tab.Screen name="Chat" component={Chatpage} />
        <Tab.Screen name="Task" component={Taskpage} />
        <Tab.Screen name="Home" component={MyHomeStack} options={{headerShown:false}}/>
        <Tab.Screen name="Requirements" component={Requirement} />
        <Tab.Screen name="Safety" component={MysafetyStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
