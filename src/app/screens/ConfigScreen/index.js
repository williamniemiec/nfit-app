import React, { useLayoutEffect } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import styles from './styles'
import globalStyles from '../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import ConfigButton from '../../components/button/small/ConfigButton'
import { TextInput } from 'react-native'
import TransparentButton from '../../components/button/TransparentButton'
import DiasDaSemana from '../../components/DiasDaSemana'
import Niveis from '../../components/Niveis'
import { Header, useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import RNRestart from 'react-native-restart'

export default function ConfigScreen() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)

    console.log(user)
    
    function handleGoBack() {
        navigation.goBack()
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:true,
            title:'Configurações',
            headerTitleAlign:'center',
            headerRight:null,
            headerLeft:() => <TransparentButton title='< Voltar' onPress={handleGoBack} />
        })
    },[])

    function handleReset() {
        Alert.alert(
            "Resetar",
            "Você tem certeza que deseja resetar tudo?",
            [
              {
                text: "Não",
                onPress: null
              },
              { 
                text: "Sim", 
                onPress: reset
              }
            ],
            { cancelable: false }
        )

        //navigation.goBack()
        /*navigation.dispatch(
            CommonActions.reset({
                index:1,
                routes: [
                    {
                        name:"StarterNavigator"
                    }
                ]
            })
        )*/
        
    }

    const reset = () => {
        dispatch({type:'RESET'})
        RNRestart.Restart()
    }

    function handleChangeWorkoutDay(day) {
        const alreadySelected = user.workoutDays.includes(day)
        const type = alreadySelected ? 'DEL_WORKOUT_DAY' : 'ADD_WORKOUT_DAY'

        dispatch({
            type:type,
            payload:{
                workoutDay:day
            }
        })
    }

    function handleChangeLevels(level) {
        dispatch({
            type:'SET_LEVEL',
            payload:{
                level:level
            }
        })
    }

    const updateName = (name) => {
        dispatch({
            type:'SET_NAME',
            payload:{
                name:name
            }
        })
    }

    return (
        <SafeAreaView style={[globalStyles.container, styles.area]}>
            <KeyboardAvoidingView style={globalStyles.container}>
                <View style={styles.formControl}>
                    <Text>Qual seu nome?</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Digite seu nome' 
                        value={user.name} 
                        onChangeText={updateName}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text>Quais dias da semana você treina?</Text>
                    <DiasDaSemana reduced={true} onPress={handleChangeWorkoutDay} selectedOps={user.workoutDays} />
                </View>
                <View style={styles.formControl}>
                    <Text>Qual seu nível?</Text>
                    <Niveis onPress={handleChangeLevels} selected={user.level} />
                </View>
                <View style={styles.formControl}>
                    <Text>Deseja limpar tudo?</Text>
                    <TransparentButton title='Resetar tudo' onPress={handleReset} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}