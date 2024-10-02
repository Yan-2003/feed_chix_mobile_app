import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screen/DashboardScreen';



const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name='Dashboard' component={DashboardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
