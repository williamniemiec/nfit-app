import React, { useLayoutEffect, useState } from 'react'
import globalStyles from '../../../assets/styles/global'
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TransparentButton from '../../../components/button/TransparentButton'
import styles from './styles'
import DiasDaSemana from '../../../components/DiasDaSemana'

export default function ScheduleScreen(props) {
    let name = props.route.params.name
    name = name.split(' ')[0]

    const navigation = useNavigation()
    const [workoutDays, setWorkoutDays] = useState(new Set())

    function handleGoNext() {
        if (workoutDays.size == 0) {
            alert('Selecione pelo menos 1 dia')
        }
        else {
            const workoutDaysList = []

            workoutDays.forEach((item, index) => workoutDaysList.push(item))

            navigation.navigate('LevelStarterScreen', {
                name, workoutDays:workoutDaysList
            })
        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:true,
            title:'',
            headerRight:() => <TransparentButton title='Próximo >' onPress={handleGoNext} />,
            headerLeft:() => <TransparentButton title='< Voltar' onPress={handleGoBack} />
        })
    },[])
    
    function handleWeekDay(dayWeek, selected) {
        setWorkoutDays(set => {
            if (selected)
                set.add(dayWeek)
            else
                set.delete(dayWeek)

            return set
        })
    }

    return (
        <SafeAreaView style={[globalStyles.container, styles.background]}>
            <View style={[styles.area]}>
                <Text style={globalStyles.message}>Ola <Text style={globalStyles.highlight}>{name}</Text>, tudo certo?</Text>
                <Text style={globalStyles.message}>Quais <Text style={globalStyles.highlight}>dias da semana</Text> você pretende treinar?</Text>
                <DiasDaSemana onPress={handleWeekDay} />
                <Text style={globalStyles.message}>Você pode alterar isso a qualquer momento</Text>
            </View>
        </SafeAreaView>
    )
}