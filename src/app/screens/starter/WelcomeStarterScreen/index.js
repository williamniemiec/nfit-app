import React from 'react'
import globalStyles from '../../../assets/styles/global'
import styles from './styles'
import { Button, SafeAreaView, Text, Image } from 'react-native'
import ActionButton from '../../../components/button/ActionButton'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    
    function handleAction() {
        navigation.navigate('NameStarterScreen')
    }
    
    return (
        <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
            <Text style={globalStyles.title}>Bem vindo(a) ao DevFit</Text>
            <Image style={styles.centralImage} source={require('../../../assets/images/boneco.png')} />
            <ActionButton title='Iniciar configuração' onPress={handleAction} />
        </SafeAreaView>
    )
}