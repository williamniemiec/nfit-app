import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styles from './styles'
import FlatButton from '../button/FlatButton'

export default function DiasDaSemana({onPress, reduced, selectedOps}) {
    if (reduced === undefined)
        reduced = false

    const [selectedOp, setSelectedOp] = useState([])
    const dayWeek = [
        reduced ? 'S' : 'Segunda',
        reduced ? 'T' : 'Terça',
        reduced ? 'Q' : 'Quarta',
        reduced ? 'Q' : 'Quinta',
        reduced ? 'S' : 'Sexta',
        reduced ? 'S' : 'Sábado',
        reduced ? 'D' : 'Domingo',
    ]

    useEffect(() => {
        if (selectedOps != undefined) {
            setSelectedOp(selectedOps)
        }
    }, [])

    function handlePress(op) {
        const selected = !selectedOp.includes(op)

        if (selectedOp.includes(op)) {
            if (selectedOp.length == 1) {
                alert('Selecione pelo menos 1 dia de treino')
                return
            }
            else {
                setSelectedOp(list => {
                    let newList = [...list]
                    newList = newList.filter((item, index) => item != op)
                    return newList
                })
            }
        }
        else
            setSelectedOp(list => {
                const newList = [...list]
                newList.push(op)
                return newList
            })
            
        onPress(op, selected)
    }

    return (
        <View style={styles.area}>
            <FlatButton selected={selectedOp.includes(1)} title={dayWeek[0]} onPress={() => handlePress(1)} />
            <FlatButton selected={selectedOp.includes(2)} title={dayWeek[1]} onPress={() => handlePress(2)} />
            <FlatButton selected={selectedOp.includes(3)} title={dayWeek[2]} onPress={() => handlePress(3)} />
            <FlatButton selected={selectedOp.includes(4)} title={dayWeek[3]} onPress={() => handlePress(4)} />
            <FlatButton selected={selectedOp.includes(5)} title={dayWeek[4]} onPress={() => handlePress(5)} />
            <FlatButton selected={selectedOp.includes(6)} title={dayWeek[5]} onPress={() => handlePress(6)} />
            <FlatButton selected={selectedOp.includes(0)} title={dayWeek[6]} onPress={() => handlePress(0)} />
        </View>
    )
}