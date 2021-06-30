import React, { useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import styles from './styles'
import globalStyles from '../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import ConfigButton from '../../components/button/small/ConfigButton'
import { useSelector, useDispatch } from 'react-redux'
import HomeMonthScroll from '../../components/HomeMonthScroll'
import HomeDaysScroll from '../../components/HomeDaysScroll'
import HomeDayStatus from '../../components/HomeDayStatus'

const Legend = () => {
    const styles = StyleSheet.create({
        area:{
            width:'100%',
            alignItems:'flex-start',
            marginTop:30,
            paddingLeft:10
        },
        legendText:{
            color:'#555'
        },
        legendItem:{
            flexDirection:'row',
            alignItems:'center',
            marginTop:5
        },  
        legendBox:{
            width:15,
            height:15,
            backgroundColor:'#ccc',
            marginRight:5
        }
    })

    const LegendItem = ({color, text}) => {
        let itemColor = (color == undefined) ? '#ccc' : color

        return (
            <View style={styles.legendItem}>
                <View style={[styles.legendBox, {backgroundColor:itemColor}]}></View>
                <Text style={styles.legendText}>{text}</Text>
            </View>
        )
    }
    
    return (
        <View style={styles.area}>
            <Text style={styles.legendText}>Legenda:</Text>
            <LegendItem color='red' text='Hoje' />
            <LegendItem color='purple' text='Treino feito' />
            <LegendItem color='blue' text='Treino perdido' />
            <LegendItem color='green' text='Dia de descanso' />
            <LegendItem color='orange' text='Dia futuro' />
        </View>
    )
}

export default function HomeScreen() {
    const navigation = useNavigation()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    function handleConfig() {
        navigation.navigate('ConfigScreen')
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:true,
            title:'Seu progresso diário',
            headerTitleAlign:'center',
            headerRight:() => <ConfigButton onPress={handleConfig} />,
            headerLeft:null
        })
    },[])

    let today = new Date()

    const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
    const [selectedDay, setSelectedDay] = useState(today.getDate())
    return (
        <SafeAreaView style={globalStyles.container}>
            <HomeMonthScroll
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <HomeDaysScroll
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                dailyProgress={user.dailyProgress}
                workoutDays={user.workoutDays}
            />
            <HomeDayStatus
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                dailyProgress={user.dailyProgress}
                workoutDays={user.workoutDays}

                addProgress={(date) => dispatch({type:'ADD_DAILY_PROGRESS', payload:{date}})}
                deleteProgress={(date) => dispatch({type:'DELETE_DAILY_PROGRESS', payload:{date}})}
                goToWorkout={() => navigation.navigate('DoTrainingNavigator')}
            />

            <Legend />
        </SafeAreaView>
    )
}