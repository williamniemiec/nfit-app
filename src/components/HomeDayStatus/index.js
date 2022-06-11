import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import ActionButton from '../button/ActionButton'
import RemainingTime from '../RemainingTime'
import { translate } from '../../locales';

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
                    <Text style={styles.ballonBigText}>{translate('daily_workout_rest')}</Text>
                }
                {isFuture && 
                    <Text style={styles.ballonBigText}>{translate('daily_workout_future')}</Text>
                }
                {!dayOff && !isFuture && isDone &&
                    <>
                        <Text style={styles.ballonBigText}>{translate('daily_workout_done_message')}</Text>
                        <ActionButton title={translate('unselect').toUpperCase()} onPress={() => deleteProgress(dayFormated)} />
                    </>
                }
                {!dayOff && !isFuture && !isDone && !isToday &&
                    <>
                        <Text style={styles.ballonBigText}>{translate('daily_workout_lost_message')}</Text>
                        <ActionButton title={translate('mark_as_done').toUpperCase()} onPress={() => addProgress(dayFormated)} />
                    </>
                }
                {!dayOff && !isFuture && !isDone && isToday &&
                    <>
                        <Text style={styles.ballonBigText}>{translate('daily_workout_today_message')}</Text>
                        <Text>{translate('remaining_time_message_pt1')} <RemainingTime /> {translate('remaining_time_message_pt2')}</Text>
                        <ActionButton title={translate('start_workout').toUpperCase()} onPress={goToWorkout} />
                    </>
                }
            </View>
        </View>
    )
}