import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styles from './styles'

export default function SaveButton({onPress}) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Image style={styles.icon} source={require('../../../../assets/images/check-black.png')} />
        </TouchableOpacity>
    )
}