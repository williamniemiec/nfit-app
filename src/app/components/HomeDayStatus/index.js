import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import ActionButton from '../button/ActionButton'
import RemainingTime from '../RemainingTime'

export default ({selectedMonth, selectedDay, setSelectedDay, dailyProgress, workoutDays, addProgress, deleteProgress, goToWorkout}) => {
    const today = new Date()
    // Zera as horas para realizar futuras comparações
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    
    const thisDate = new Date(today.getFullYear(), selectedMonth, selectedDay, 0, 0, 0, 0)
    let thisYear = thisDate.getFullYear()
    let thisMonth = thisDate.getMonth() + 1
    let thisDay = thisDate.getDate()

    // força 0 a esquerda
    if (thisMonth < 10)
        thisMonth = '0' + thisMonth

    if (thisDay < 10)
        thisDay = '0' + thisDay

    let dayFormated = `${thisYear}-${thisMonth}-${thisDay}`

    // Flags
    let dayOff = false
    let isToday = false
    let isFuture = false
    let isDone = false
    
    if (!workoutDays.includes(thisDate.getDay())) {
        dayOff = true
    }
    else if (thisDate.getTime() > today.getTime()) {
        isFuture = true
    }
    else {
        if (dailyProgress.includes(dayFormated))
            isDone = true
        else
            isDone = false
    }
    if (thisDate.getTime() == today.getTime())
        isToday = true

    const handleUndoneWorkout = () => {
        deleteProgress(dayFormated)
    }

    const handleDoneWorkout = () => {
        addProgress(dayFormated)
    }

    return (
        <View style={styles.area}>
            <View style={styles.ballonTriangle}></View>
            <View style={styles.ballonArea}>
                {dayOff && 
                    <Text style={styles.ballonBigText}>Dia de descanso</Text>
                }
                {isFuture && 
                    <Text style={styles.ballonBigText}>Data no futuro</Text>
                }
                {!dayOff && !isFuture && isDone &&
                    <>
                        <Text style={styles.ballonBigText}>Parabens, você treinou!</Text>
                        <ActionButton title='DESMARCAR' onPress={() => deleteProgress(dayFormated)} />
                    </>
                }
                {!dayOff && !isFuture && !isDone && !isToday &&
                    <>
                        <Text style={styles.ballonBigText}>Fraco! Você não treinou nesse dia</Text>
                        <ActionButton title='MARCAR COMO FEITO' onPress={() => addProgress(dayFormated)} />
                    </>
                }
                {!dayOff && !isFuture && !isDone && isToday &&
                    <>
                        <Text style={styles.ballonBigText}>Hoje tem treino!</Text>
                        <Text>Você tem <RemainingTime /> para treinar</Text>
                        <ActionButton title='INICIAR TREINO' onPress={goToWorkout} />
                    </>
                }
            </View>
        </View>
    )
}