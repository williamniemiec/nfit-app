import React from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

export default function Legs() {
    return (
        <View style={styles.area}>
            <Image style={styles.image} source={require('../../assets/images/muscles/legs.png')} />
        </View>
    )
}