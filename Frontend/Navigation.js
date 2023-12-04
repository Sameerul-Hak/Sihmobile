import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View ,TouchableOpacity,Text,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chatpage from './Components/Chatpage';
import Requirement from './Components/Requirement';
import Taskpage from './Components/Taskpage';
import Safetypage from './Components/Safetypage';
import Homepage from './Components/Homepage';
import Alertpage from './Components/Alertpage';
import AdminMessage from './Components/AdminMessage';
import Login from './Components/Login';
import Register from './Components/Register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuIcon from './assets/menuIcon.png'
import ProfileIcon from './assets/profilepng.png'

const Stack = createStackNavigator();

const HeaderComponent = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,paddingVertical:10 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('./assets/menuIcon.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#9E6EB1', marginVertical: 5 }}>Stone Paper Scissor</Text>
        
        <View>
          <Image source={require('./assets/profilepng.png')} style={{ width: 40, height: 40 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
        options={{headerShown:false}}
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
      <Stack.Navigator 
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register}/>  
      <Stack.Screen 
          name="Maintab" 
          component={MainTab}
          options={({ navigation }) => ({
            header: () => <HeaderComponent navigation={navigation} />,
          })}
        />     
    </Stack.Navigator>
    </NavigationContainer>
  );
}
