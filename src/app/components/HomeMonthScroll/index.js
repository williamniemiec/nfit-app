import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Dimensions, ScrollView, View, Text, TouchableHighlight } from 'react-native'
import styles from './styles'

let months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]
const screenWidth = Math.round(Dimensions.get('window').width)
let thirdWidth = screenWidth / 3 // 1/3 da largura da tela

export default ({selectedMonth, setSelectedMonth}) => {
    const monthRef = useRef()

    const handleScrollEnd = (event) => {
        let posX = event.nativeEvent.contentOffset.x
        const selectedIdx = Math.round(posX/thirdWidth)

        setSelectedMonth(selectedIdx)
    }

    const scrollToMonth = (month) => {
        let posX = month * thirdWidth
        
        monthRef.current.scrollTo({
            x:posX,
            y:0,
            animated:true
        })
    }

    useLayoutEffect(() => {
        const currentMonth = (selectedMonth === undefined) ? 0 : selectedMonth
        scrollToMonth(currentMonth)
    }, [selectedMonth])

    const handleSelectMonth = (index) => {
        setSelectedMonth(index)
    }

    return (
        <ScrollView
            horizontal={true}
            ref={monthRef}
            showsHorizontalScrollIndicator={false}
            decelerationRate='fast'
            snapToInterval={thirdWidth} // Impede de parar no meio
            contentContainerStyle={{paddingLeft:thirdWidth, paddingRight:thirdWidth}}
            onMomentumScrollEnd={handleScrollEnd}
            style={styles.area}
        >
            {months.map((month, index) => (
                <TouchableHighlight 
                    onPress={() => handleSelectMonth(index)} 
                    key={index} 
                    style={[
                        styles.monthButton, 
                        {width:thirdWidth-20},
                        {backgroundColor:(selectedMonth == index) ? 'green' : '#ccc'}
                    ]}
                    underlayColor='#00cc55'
                >
                    <Text style={[styles.monthLabel,{color:(selectedMonth == index) ? 'white' : 'black'}]}>{month}</Text>
                </TouchableHighlight>
            ))}
            
        </ScrollView>
    )
}