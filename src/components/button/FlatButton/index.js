import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './styles'

export default function FlatButton({title, onPress, selected}) {
    return (
        <TouchableHighlight 
            underlayColor={selected ? 'transparent' : '#aaa'} 
            style={[styles.btnArea, selected ? styles.selected : null]} 
            onPress={onPress}
        >
            <Text style={[styles.btnTitle, selected ? styles.selected : null]}>{title}</Text>
        </TouchableHighlight>
    )
}