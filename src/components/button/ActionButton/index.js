import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

export default function ActionButton({title, onPress, bgColor}) {
    let bgStyle = null
    if (bgColor != undefined)
        bgStyle={backgroundColor:bgColor}

    return (
        <TouchableOpacity style={[styles.btn, bgStyle]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}