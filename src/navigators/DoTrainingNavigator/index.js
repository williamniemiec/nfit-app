import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChooseTrainingScreen from '../../screens/ChooseTrainingScreen'
import PlayTrainingScreen from '../../screens/PlayTrainingScreen'
import { headerStyle } from './styles'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={headerStyle}>
            <Stack.Screen name='ChooseTrainingScreen' component={ChooseTrainingScreen} />
            <Stack.Screen name='PlayTrainingScreen' component={PlayTrainingScreen} />
        </Stack.Navigator>
    )
}