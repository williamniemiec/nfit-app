import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
