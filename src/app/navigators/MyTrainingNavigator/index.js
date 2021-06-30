import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyTrainingScreen from '../../screens/MyTrainingScreen'
import EditWorkoutScreen from '../../screens/EditWorkoutScreen'
import { headerStyle } from './styles'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={headerStyle}>
            <Stack.Screen name='MyTrainingScreen' component={MyTrainingScreen} options={{title:'My Training'}} />
            <Stack.Screen name='EditWorkoutScreen' component={EditWorkoutScreen} options={{title:'Edit Training'}} />
        </Stack.Navigator>
    )
}