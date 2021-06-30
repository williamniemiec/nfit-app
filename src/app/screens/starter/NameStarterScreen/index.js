import React, { useLayoutEffect, useRef, useState } from 'react'
import globalStyles from '../../../assets/styles/global'
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TransparentButton from '../../../components/button/TransparentButton'
import styles from './styles'
import { useDispatch } from 'react-redux'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    const [name, setName] = useState('')

    const refName = useRef(name)

    const handleGoNext = () => {
        if (refName.current === '') {
            alert("Digite um nome")
        }
        else {
            navigation.navigate('ScheduleStarterScreen', {
                name:refName.current
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

    //const dispatch = useDispatch()
    /*
    function changeName(name) {
        dispatch({
            type:'SET_NAME',
            payload:{
                name:name
            }
        })
    }*/

    function changeName(name) {
        setName(name)
        refName.current = name
    }

    return (
        <SafeAreaView style={[globalStyles.container, globalStyles.background]}>
            <View style={[styles.area]}>
                <Text style={globalStyles.title}>Qual é o seu nome?</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Nome' 
                    onChangeText={changeName} 
                    autoFocus={true} 
                    autoCapitalize="words" 
                    onSubmitEditing={handleGoNext}
                />
            </View>
        </SafeAreaView>
    )
}