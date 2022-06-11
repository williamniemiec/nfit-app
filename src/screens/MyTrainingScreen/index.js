import React, {useLayoutEffect} from 'react'
import { View, Alert, ScrollView } from 'react-native'
import styles from './styles'
import globalStyles from '../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import AddButton from '../../components/button/small/AddButton'
import EditButton from '../../components/button/small/EditButton'
import TrashButton from '../../components/button/small/TrashButton'
import Workout from '../../components/Workout'
import { translate } from '../../locales';
import { buildHeaderTabAccent } from '../../components/HeaderTab';
import BarbellBackground from '../../components/background/BarbellBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function TrainingScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const user = useSelector(state => state.user)

    useLayoutEffect(()=> {
        navigation.setOptions(buildHeaderTabAccent(null, <AddButton onPress={() => navigation.navigate('EditWorkoutScreen')} />, translate('my_workouts')));
    },[])

    const handleEditWorkout = (workout) => {
        navigation.navigate('EditWorkoutScreen', {workout})
    }

    const handleDeleteWorkout = (workoutId) => {
        Alert.alert(
            translate('remove_workout'),
            translate('remove_workout_confirmation'),
            [
              {
                text: translate('no'),
                onPress: null
              },
              { 
                text: translate('yes'), 
                onPress: () => dispatch({type:'DEL_MY_WORKOUTS', payload:{workoutId:workoutId}})
              }
            ],
            { cancelable: false }
          )
    }

    return (
        <BarbellBackground>
        <ScrollView style={[globalStyles.container, styles.body]}>
            {user.myWorkouts.map((workout, index) => (
                <View style={styles.area} key={index}>
                    <Workout
                        id={workout.id} 
                        name={workout.name} 
                        exercises={workout.exercises} 
                    />
                    <View style={styles.actions}>
                        <EditButton onPress={() => handleEditWorkout(workout)} />
                        <TrashButton onPress={() => handleDeleteWorkout(workout)} />
                    </View> 
                </View>  
            ))}
        </ScrollView>
        </BarbellBackground>
    )
}

//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------