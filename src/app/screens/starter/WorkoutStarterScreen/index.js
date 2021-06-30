import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import styles from './styles'
import globalStyles from '../../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import Trainings from '../../../components/Trainings'
import TransparentButton from '../../../components/button/TransparentButton'
import { CommonActions } from '@react-navigation/native'
import workoutJson from '../../../assets/presetWorkouts.json'

export default function TrainingScreen(props) {
    const navigation = useNavigation()
    const [workouts, setWorkouts] = useState([])
    const [nextBtnLabel, setNextBtnLabel] = useState('')
    const [totWorkout, setTotWorkout] = useState(0)

    const handleGoNext = () => {
        // Disables 'back' button
        props.navigation.dispatch(
            CommonActions.reset({
                index:1,
                routes: [
                    {
                        name:"HomeNavigator",
                        params:{...props.route.params, totWorkout, workout:workouts}
                    }
                ]
            })
        )
    }

    useEffect(() => {
        setNextBtnLabel(workouts.size == 0 ? 'Ignorar' : 'Concluir ')
    }, [])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:true,
            title:'',
            headerRight:() => <TransparentButton title={nextBtnLabel} onPress={handleGoNext} />,
            headerLeft:() => <TransparentButton title='< Voltar' onPress={() => navigation.goBack()} />
        })
    },[nextBtnLabel])

    function handleTrainingSelect(workout, selected) {
        setWorkouts(workoutList => {
            const newWorkoutList = workoutList

            if (selected)
                newWorkoutList.push(workout) 
            else {
                const index = newWorkoutList.findIndex(e => e.id == workout.id)
                newWorkoutList.pop(index)
            }

            setNextBtnLabel(newWorkoutList.length == 0 ? 'Ignorar' : 'Concluir')
            setTotWorkout(newWorkoutList.length)

            return newWorkoutList
        })
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.messages}>
                <Text style={globalStyles.message}>Opções de treino pré-criados com base no seu nível</Text>
                <Text>Você selecionou {totWorkout} treinos</Text>
            </View>
            <Trainings data={workoutJson} style={styles.trainings} onPress={handleTrainingSelect} />
        </SafeAreaView>
    )
}