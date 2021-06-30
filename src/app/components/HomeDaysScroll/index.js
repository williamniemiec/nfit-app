import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './styles'

const screenWidth = Math.round(Dimensions.get('window').width)
let dayWidth = Math.round(screenWidth / 9) // 1/3 da largura da tela
let offsetWidth = Math.round((screenWidth - dayWidth) / 2)

const Day = ({day, month, dailyProgress, workoutDays, onPress}) => {
    const styles = StyleSheet.create({
        dayButton:{
            justifyContent:'center',
        },
        dayItem:{
            justifyContent:'center',
            alignItems:'center',
            width:30,
            height:30,
            borderRadius:15,
            backgroundColor:'#ccc'
        },
        dayText:{

        }
    })

    const setColor = () => {
        const today = new Date()
        // Zera as horas para realizar futuras comparações
        today.setHours(0)
        today.setMinutes(0)
        today.setSeconds(0)
        today.setMilliseconds(0)
        
        const thisDate = new Date(today.getFullYear(), month, day, 0, 0, 0, 0)
        let opacity = 1
        let bgColor = 'white'
        let borderColor = null
        let borderWidth = 0

        if (workoutDays.includes(thisDate.getDay())) {
            if (thisDate.getTime() <= today.getTime()) { // Verifica se esta em um dia passado diferente de hoje
                let thisYear = thisDate.getFullYear()
                let thisMonth = thisDate.getMonth() + 1
                let thisDay = thisDate.getDate()

                // força 0 a esquerda
                if (thisMonth < 10)
                    thisMonth = '0' + thisMonth

                if (thisDay < 10)
                    thisDay = '0' + thisDay

                let dayFormated = `${thisYear}-${thisMonth}-${thisDay}`
                console.log(dayFormated)
                console.log(dailyProgress)

                if (dailyProgress.includes(dayFormated)) { // Verifica se o treino foi feito
                    bgColor = 'purple'
                }
                else {
                    bgColor = 'blue'
                }
            }
        }
        else { // Dia de descanso
            opacity = 0.2
        }


        if (thisDate.getTime() == today.getTime()) {// compara se dia enviado é o dia de hoje
            borderColor='#ff4444'
            borderWidth=3
        }
        
        
        return {
            backgroundColor:bgColor,
            borderWidth:borderWidth,
            borderColor:borderColor,
            opacity:opacity 
        }
    }

    return (
        <TouchableHighlight onPress={onPress} underlayColor='transparent' style={[styles.dayButton, {width:dayWidth}]}>
            <View style={[styles.dayItem, setColor()]}>
                <Text style={styles.dayText}>{day}</Text>
            </View>
        </TouchableHighlight>
    )
}


export default ({selectedMonth, selectedDay, setSelectedDay, dailyProgress, workoutDays}) => {
    const dayRef = useRef()
    const [days, setDays] = useState([])
    
    const handleScrollEnd = (event) => {
        let posX = event.nativeEvent.contentOffset.x
        const selectedIdx = Math.round(posX/dayWidth + 1) // +1 pq dia 1 deve começar com posição 1

        setSelectedDay(selectedIdx)
    }

    const scrollToDay = (day) => {
        let posX = (day - 1) * dayWidth // -1 pq dia começa com 1
        
        dayRef.current.scrollTo({
            x:posX,
            y:0,
            animated:true
        })
    }

    useLayoutEffect(() => {
        let daysInMonth = new Date(new Date().getFullYear(), (selectedMonth+1), 0).getDate() // dia=0 pq pega ultimo dia do mes anterior
        const daysList = []

        for (let i = 1; i <= daysInMonth; i++) {
            daysList.push(i)    
        }
        setDays(daysList)
        
        setTimeout(() => { // Necessário para dar tempo do scrollview carregar
            if (selectedMonth == new Date().getMonth())
                scrollToDay(selectedDay)
            else
                scrollToDay(1)
        }, 100)
        
    }, [selectedMonth])

    const handleSelectDay = (day) => {
        scrollToDay(day)
        setSelectedDay(day)
    }

    return (
        <ScrollView
            horizontal={true}
            ref={dayRef}
            showsHorizontalScrollIndicator={false}
            decelerationRate='fast'
            snapToInterval={dayWidth} // Impede de parar no meio
            contentContainerStyle={{paddingLeft:offsetWidth, paddingRight:offsetWidth}}
            onMomentumScrollEnd={handleScrollEnd}
            style={styles.area}
        >
            {days.map((day, index) => (
                <Day 
                    key={day}
                    day={day}
                    month={selectedMonth}
                    dailyProgress={dailyProgress}
                    workoutDays={workoutDays}
                    onPress={() => handleSelectDay(day)}
                />
            ))}
        </ScrollView>
    )
}