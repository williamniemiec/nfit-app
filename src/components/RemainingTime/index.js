import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function RemainingTime() {
    const [timeLeft, setTimeLeft] = useState(0)
    
    useEffect(() => {
        const timerFunction = () => {
            const now = new Date().getTime()
            let end = new Date()
            end.setHours(23)
            end.setMinutes(59)
            end.setSeconds(59)
            end = end.getTime()
            
            let diff = end - now

            let h = Math.floor(diff / (1000 * 60 * 60))
            let m = Math.floor((diff / (1000 * 60)) - (h * 60))
            let s = Math.floor((diff / (1000)) - (m * 60) - (h * 60 * 60))

            if (h < 10)
                h = '0' + h
            if (m < 10)
                m = '0' + m
            if (s < 10)
                s = '0' + s

            setTimeLeft(`${h}h ${m}min ${s}seg`)
        }
        let timer = setInterval(timerFunction, 1000)

        return () => clearInterval(timer) // Para interval ao sair da tela
    }, [])
    
    return (
        <Text>{timeLeft}</Text>
    )
}