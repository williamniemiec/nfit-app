import React, { useLayoutEffect, useState } from 'react'
import { FlatList, StatusBar, View, Text, ImageBackground, SafeAreaView } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import globalStyles from '../../assets/styles/global'
import styles from './styles'
import CloseButton from '../../components/button/small/CloseButton'
import ExerciseItem from '../../components/ExerciseItem'
import { useDispatch } from 'react-redux'
import { translate } from '../../locales';
import FitnessBackground from '../../components/background/FitnessBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function MyTrainingScreen(props) {
    const exercisesDone = new Set()
    const workout = props.route.params.workout
    const navigation = useNavigation()
    const exercises = workout.exercises
    const dispatch = useDispatch()

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:false,
        })


    },[])

    const handleOnCheck = (exercise, index) => {
        if (exercisesDone.has(exercise.id)) {
            exercisesDone.delete(exercise.id)
        }
        else {
            exercisesDone.add(exercise.id)
        }
        console.log(exercisesDone)

        if (isAllExercisesDone()) {
            alert(translate('all_workouts_done'))

            const today = new Date()
            let thisYear = today.getFullYear()
            let thisMonth = today.getMonth() + 1
            let thisDay = today.getDate()

            // força 0 a esquerda
            if (thisMonth < 10)
                thisMonth = '0' + thisMonth

            if (thisDay < 10)
                thisDay = '0' + thisDay

            let dayFormated = `${thisYear}-${thisMonth}-${thisDay}`

            dispatch({
                type:'ADD_DAILY_PROGRESS',
                payload:{date: dayFormated}
            })

            dispatch({
                type:'SET_LAST_WORKOUT',
                payload:{workout: workout.id}
            })

            navigation.dispatch(
                CommonActions.reset({
                    index:1,
                    routes: [
                        {
                            name:"HomeNavigator"
                        }
                    ]
                })
            )
        }

    }

    const isAllExercisesDone = () => {
        return exercisesDone.size == exercises.length
    }

    return (
        <FitnessBackground>
            <SafeAreaView style={styles.lightBackground}>
                <View style={globalStyles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{workout.name}</Text>
                        <CloseButton light={true} onPress={() => navigation.goBack()} />
                    </View>
                    <FlatList 
                        style={styles.workoutList}
                        data={exercises}
                        renderItem={({item, index}) => (
                            <ExerciseItem data={item} index={index+1} onCheck={() => handleOnCheck(item, index)} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </SafeAreaView>
        </FitnessBackground>
    )
}


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
