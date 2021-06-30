import React, { useLayoutEffect, useState } from 'react'
import { FlatList, StatusBar, View, Text, ImageBackground, SafeAreaView } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import globalStyles from '../../assets/styles/global'
import styles from './styles'
import CloseButton from '../../components/button/small/CloseButton'
import ExerciseItem from '../../components/ExerciseItem'
import { useDispatch } from 'react-redux'



export default function MyTrainingScreen(props) {
    const exercisesDone = new Set()
    const workout = props.route.params.workout
    const navigation = useNavigation()
    const exercises = workout.exercises
    //const [exercisesDone, setExercisesDone] = useState(new Set())
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
            alert('Tudo feito!')

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
        /*for (let i = 0; i < exercises.length; i++) {
            if (!exercises[i].done)
                return false
        }

        return true*/
        return exercisesDone.size == exercises.length
    }

    return (
        <ImageBackground style={styles.background} source={require('../../assets/images/fitness.jpg')}>
            <StatusBar barStyle='light-content' backgroundColor='#333' />
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
        </ImageBackground>
    )
}