import 'react-native-gesture-handler';
import * as React from 'react';
import { Button,
  View,
  TextInput,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Login from "./components/Login";
import Signup from './components/Signup';
import UserInfo from './components/UserInfo';
import Edit from "./components/Edit";
import Orders from "./components/Orders";
import EditOrder from "./components/EditOrder"
import Note from "./components/Note"


const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" 
      screenOptions = {{headerShown : false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="EditOrder" component={EditOrder} />
      <Stack.Screen name="Note" component={Note} />
      
      
      </Stack.Navigator>
     
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;