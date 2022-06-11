import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function TransparentButton({title, onPress, fgColor='#000000'}) {

    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={[styles.title, {color: fgColor}]}>{title}</Text>
        </TouchableOpacity>
    )
}
