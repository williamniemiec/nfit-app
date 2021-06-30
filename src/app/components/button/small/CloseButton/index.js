import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

export default function CloseButton({onPress, light}) {
    const color = {color: light ? 'white' : 'black'} 
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={[styles.icon, color]}>X</Text>
        </TouchableOpacity>
    )
}