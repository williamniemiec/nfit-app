import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import styles from './styles'
import FlatButton from '../button/FlatButton'

export default function DiasDaSemana({onPress, funny, selected}) {
    const [selectedOp, setSelectedOp] = useState(-1)

    if (funny === undefined)
        funny = false
    
    const titles = [
        funny ? 'Iniciante / Um frango' : 'Iniciante',
        funny ? 'Intermediário / Me viro bem' : 'Intermediário',
        funny ? 'Avançado / Primo do The Rock' : 'Avançado',
    ]

    useEffect(() => {
        if (selected != undefined) {
            setSelectedOp(selected)
        }
    }, [])

    function handlePress(op) {
        setSelectedOp(op)
        onPress(op)
    }

    return (
        <View style={styles.area}>
            <FlatButton selected={selectedOp == 0} title={titles[0]} onPress={() => handlePress(0)} />
            <FlatButton selected={selectedOp == 1} title={titles[1]} onPress={() => handlePress(1)} />
            <FlatButton selected={selectedOp == 2} title={titles[2]} onPress={() => handlePress(2)} />
        </View>
    )
}