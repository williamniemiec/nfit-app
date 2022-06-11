import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Dimensions, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import styles from './styles';
import { translate } from './locales';

let months = [
  translate('january'),
  translate('february'),
  translate('march'),
  translate('april'),
  translate('may'),
  translate('june'),
  translate('july'),
  translate('august'),
  translate('september'),
  translate('october'),
  translate('november'),
  translate('december')
];

const screenWidth = Math.round(Dimensions.get('window').width)
let thirdWidth = screenWidth / 3 // 1/3 da largura da tela

export default ({ selectedMonth, setSelectedMonth, fgColor, bgColorActive, bgColorInactive }) => {
  const monthRef = useRef()

  const handleScrollEnd = (event) => {
    let posX = event.nativeEvent.contentOffset.x
    const selectedIdx = Math.round(posX / thirdWidth)

    setSelectedMonth(selectedIdx)
  }

  const scrollToMonth = (month) => {
    let posX = month * thirdWidth

    monthRef.current.scrollTo({
      x: posX,
      y: 0,
      animated: true
    })
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      scrollToMonth(selectedMonth)
    }, 100);
  }, [selectedMonth]);

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
      contentContainerStyle={{ paddingLeft: thirdWidth, paddingRight: thirdWidth }}
      onMomentumScrollEnd={handleScrollEnd}
      style={styles.area}
    >
      {months.map((month, index) => (
        <TouchableOpacity
          onPress={() => handleSelectMonth(index)}
          key={index}
          style={[
            styles.monthButton,
            { width: thirdWidth - 20, backgroundColor: (selectedMonth == index) ? bgColorActive : bgColorInactive }
          ]}
        >
          <Text style={[styles.monthLabel, { color: fgColor }]}>{month}</Text>
        </TouchableOpacity>
      ))}

    </ScrollView>
  )
}