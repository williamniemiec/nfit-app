import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerStyle } from './styles.js'
import WelcomeStarterScreen from '../../screens/starter/WelcomeStarterScreen'
import NameStarterScreen from '../../screens/starter/NameStarterScreen'
import ScheduleStarterScreen from '../../screens/starter/ScheduleStarterScreen'
import LevelStarterScreen from '../../screens/starter/LevelStarterScreen'
import WorkoutStarterScreen from '../../screens/starter/WorkoutStarterScreen'
import HomeNavigator from '../HomeNavigator'

const StackNavigator = createStackNavigator()

export default function WelcomeNavigator() {
    return (
        <StackNavigator.Navigator screenOptions={headerStyle}>
            <StackNavigator.Screen name='WelcomeStarterScreen' component={WelcomeStarterScreen} />
            <StackNavigator.Screen name='NameStarterScreen' component={NameStarterScreen} />
            <StackNavigator.Screen name='ScheduleStarterScreen' component={ScheduleStarterScreen} />
            <StackNavigator.Screen name='LevelStarterScreen' component={LevelStarterScreen} />
            <StackNavigator.Screen name='WorkoutStarterScreen' component={WorkoutStarterScreen} />
            <StackNavigator.Screen name='HomeNavigator' component={HomeNavigator} />
        </StackNavigator.Navigator>
    )
}