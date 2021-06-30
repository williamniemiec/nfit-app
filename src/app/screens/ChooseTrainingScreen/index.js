import React, {useLayoutEffect} from 'react'
import { ScrollView, Image, View, SafeAreaView, Text } from 'react-native'
import styles from './styles'
import globalStyles from '../../assets/styles/global'
import { useNavigation, CommonActions } from '@react-navigation/native'
import Trainings from '../../components/Trainings'
import TransparentButton from '../../components/button/TransparentButton'
import { useSelector } from 'react-redux'
import TrainingSet from '../../components/TrainingSet'
import Chest from '../../components/muscles/Chest'
import Abs from '../../components/muscles/Abs'
import Workout from '../../components/Workout'
import PlayButton from '../../components/button/small/PlayButton'

export default function TrainingScreen() {
    const navigation = useNavigation()
    const user = useSelector(s => s.user)

    //const workoutsDone = []
    //const workoutsDoneId = []
    //const workoutsToDo = user.myWorkouts.filter(w => !workoutsDoneId.includes(w.id))

    console.log(user)


    function handleGoBack() {
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

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:true,
            title:'Escolha seu treino',
            headerRight:null,
            headerLeft:() => <TransparentButton title='< Voltar' onPress={handleGoBack} />
        })
    },[])

    const goWorkout = (workout) => {
        navigation.navigate('PlayTrainingScreen', {workout})
    }

    const LastWorkout = () => {
        if (!user.lastWorkout)
            return <View></View>
        
        const lastWorkout = user.myWorkouts.find(w => w.id == user.lastWorkout)

        return (
            <View>
                <Text style={globalStyles.message}>Seu último treino foi:</Text>
                <View style={styles.area}>
                    <Workout
                        id={lastWorkout.id} 
                        name={lastWorkout.name} 
                        exercises={lastWorkout.exercises} 
                    />
                </View>
            </View>
        )
    }

    const RemainingWorkouts = () => (
        <ScrollView style={[globalStyles.container, styles.body]}>
            {user.myWorkouts.map((workout, index) => (
                workout.id != user.lastWorkout &&
                <View style={styles.area} key={index}>
                    <Workout
                        id={workout.id} 
                        name={workout.name} 
                        exercises={workout.exercises} 
                    />
                    <PlayButton onPress={() => goWorkout(workout)} />
                </View>  
            ))}
        </ScrollView>
    )

    return (
        <SafeAreaView style={[globalStyles.container, styles.body]}>
            <LastWorkout />
            <RemainingWorkouts />
        </SafeAreaView>
    )
}