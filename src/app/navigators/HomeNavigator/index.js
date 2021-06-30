import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from '../HomeStackNavigator'
import CustomTabBar from '../../components/CustomTabBar'
import DoTrainingNavigator from '../DoTrainingNavigator'
import MyTrainingNavigator from '../MyTrainingNavigator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import MainNavigator from '../MainNavigator'

const Tab = createBottomTabNavigator()

export default (p) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (p.route === undefined || p.route.params.name === undefined)
            return

        dispatch({
            type:'SET_NAME',
            payload:{
                name:p.route.params.name
            }
        })

        dispatch({
            type:'SET_LEVEL',
            payload:{
                level:p.route.params.level
            }
        })

        dispatch({
            type:'SET_WORKOUT_DAYS',
            payload:{
                workoutDays:p.route.params.workoutDays
            }
        })

        dispatch({
            type:'SET_MY_WORKOUTS',
            payload:{
                workouts: p.route.params.workout
            }
        })
    }, [p])
    
    function isNewUser() {
        const user = useSelector(state => state.user)
    
        return  (user.name === '')
                || (user.name === undefined)
    }

    if (isNewUser()) {
        return <MainNavigator />
    }
    else {
        return (
            <Tab.Navigator 
                tabBar={(props) => <CustomTabBar {...props} />}
                tabBarOptions={{keyboardHidesTabBar:true}}
                initialRouteName='HomeNavigator'
            >
                <Tab.Screen 
                    name='HomeNavigator' 
                    component={HomeStackNavigator} 
                    options={{
                        title:'Home', 
                        type:'regular', 
                        icon:require('../../assets/images/home.png')
                    }}
                />
                <Tab.Screen 
                    name='DoTrainingNavigator' 
                    component={DoTrainingNavigator} 
                    options={{
                        title:'Play', 
                        type:'big', 
                        icon:require('../../assets/images/dumbbell.png'),
                        tabBarVisible:false
                    }} 
                />
                <Tab.Screen 
                    name='MyTrainingNavigator' 
                    component={MyTrainingNavigator} 
                    options={{
                        title:'My Training', 
                        type:'regular',
                        icon: require('../../assets/images/myworkouts.png')
                    }} 
                />
            </Tab.Navigator>
        )
    }
}