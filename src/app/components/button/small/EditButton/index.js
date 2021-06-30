import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styles from './styles'

export default function AddButton({onPress, selected}) {
    const icon = selected 
        ? require('../../../../assets/images/edit-black.png') 
        : require('../../../../assets/images/edit-black.png')
    
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Image style={styles.icon} source={icon} />
        </TouchableOpacity>
    )
}