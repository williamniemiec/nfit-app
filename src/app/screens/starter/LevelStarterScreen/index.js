import React, { useLayoutEffect, useRef, useState } from 'react'
import globalStyles from '../../../assets/styles/global'
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TransparentButton from '../../../components/button/TransparentButton'
import styles from './styles'
import Niveis from '../../../components/Niveis'
import { useSelector } from 'react-redux'

export default function WelcomeScreen(props) {
    const navigation = useNavigation()
    const [level, setLevel] = useState(-1)

    const levelRef = useRef(level)

    function handleGoNext() {
        if (levelRef.current < 0)
            alert("Selecione um nível")
        else
            navigation.navigate('WorkoutStarterScreen', {
                ...props.route.params, level:levelRef.current
            })
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

    const user = useSelector(s=>s.user)
    const totalDays = user.totalDays

    function handleLevel(level) {
        setLevel(level)
        levelRef.current = level
    }

    function generateScheduleMessage() {
        switch (totalDays) {
            case 1:
                return 'Não é o ideal, mas...'
            case 2:
                return 'Legal, ' + totalDays + ' dias. Recomendo que aumente com o tempo.'
            case 3:
                return 'Boa, ' + totalDays + ' dias é uma boa escolha'
            case 4:
                return 'É isso ai! ' + totalDays + ' dias fará você ter resultado mais rápido'
            case 5:
                return 'Uma semana completa de treino é uma ótima escolha'
            case 6:
                return totalDays + ' dias? VocÊ aproveita mesmo, em?'
            case 7:
                return totalDays + 'dias ??!! É você, Arnold Schwarzenegger?'
        }
    }

    return (
        <SafeAreaView style={[globalStyles.container, styles.background]}>
            <View style={[styles.area]}>
                <Text style={[globalStyles.message, globalStyles.highlight]}>{generateScheduleMessage()}</Text>
                <Text style={globalStyles.message}>Qual seu nivel hoje?</Text>
                <Niveis onPress={handleLevel} funny={true} />
                <Text style={globalStyles.message}>Você pode alterar isso a qualquer momento</Text>
            </View>
        </SafeAreaView>
    )
}