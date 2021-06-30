import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ConfigScreen from '../screens/ConfigScreen'
import StarterNavigator from './StarterNavigator'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='ConfigScreen' component={ConfigScreen} />
            {/*<Stack.Screen name='StarterNavigator' component={StarterNavigator} />*/}
        </Stack.Navigator>
    )
}