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
import Login from './Components/Login';
import Register from './Components/Register';

const Stack = createStackNavigator();

function MyHomeStack({route}) {
  const { userData } = route.params; 
  return (
    <Stack.Navigator screenOptions={
      {
        headerShown: false,
      }
    }>
      <Stack.Screen name="Home" component={Homepage} 
      initialParams={{ userData }}
      />
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
function MainTab({ route }) {
  const { userData } = route.params; 
  return (
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
      <Tab.Screen
        name="Chat"
        component={Chatpage}
        initialParams={{ userData }}
      />
      <Tab.Screen
        name="Task"
        component={Taskpage}
        initialParams={{ userData }}
      />
      <Tab.Screen
        name="Home"
        component={MyHomeStack}
        options={{ headerShown: false }}
        initialParams={{ userData }}
      />
      <Tab.Screen
        name="Requirements"
        component={Requirement}
        initialParams={{ userData }}
      />
      <Tab.Screen
        name="Safety"
        component={MysafetyStack}
        initialParams={{ userData }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
      {
        headerShown: false,
      }
    }>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register}/>      
      <Stack.Screen name="Maintab" component={MainTab}/>      
    </Stack.Navigator>
    </NavigationContainer>
  );
}
