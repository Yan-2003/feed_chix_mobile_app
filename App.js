import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screen/DashboardScreen';
import LightScreen from './screen/LightScreen';



const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer o>
      <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown : false }}>
        <Stack.Screen name='Dashboard' component={DashboardScreen}/>
        <Stack.Screen name='LightControl' component={LightScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
