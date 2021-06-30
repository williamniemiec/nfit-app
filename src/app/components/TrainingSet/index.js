import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './styles'


export default function TrainingSet({title, icons}) {
    return (
        <View style={styles.left}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView horizontal={true} style={styles.icons}>
                {icons != undefined &&
                icons}
            </ScrollView>
        </View>
        
    )
}