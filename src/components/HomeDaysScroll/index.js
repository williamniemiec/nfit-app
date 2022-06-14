import React, { useState, useRef, useLayoutEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styles from './styles';
import Day from './Day';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const screenWidth = Math.round(Dimensions.get('window').width);
const dayWidth = Math.round(screenWidth / 9);
const offsetWidth = Math.round((screenWidth - dayWidth) / 2) - 10;


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const HomeDaysScroll = ({
  selectedMonth,
  selectedDay,
  setSelectedDay,
  dailyProgress,
  workoutDays,
  colorMapping,
}) => {
  const dayRef = useRef();
  const [days, setDays] = useState([]);

  useLayoutEffect(() => {
    let daysInMonth = getLastMonth(selectedMonth);

    setDays(getDaysOfMonthInArray(daysInMonth));
    setTimeout(() => {
      // It is necessary because of ScrollView render time
      if (selectedMonth == getCurrentMonth()) {
        scrollToDay(selectedDay, dayRef);
      }
      else {
        scrollToDay(1, dayRef);
      }
    }, 100);
  }, [selectedMonth]);

  return (
    <ScrollView
      horizontal={true}
      ref={dayRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={dayWidth} // Avoids stopping on the middle of screen
      contentContainerStyle={{
        paddingLeft: offsetWidth,
        paddingRight: offsetWidth,
      }}
      onMomentumScrollEnd={(event) => handleScrollEnd(event, setSelectedDay)}
      style={styles.area}>
      {days.map((day, _) => (
        <Day
          key={day}
          day={day}
          month={selectedMonth}
          dailyProgress={dailyProgress}
          workoutDays={workoutDays}
          onPress={() => handleSelectDay(day, dayRef, setSelectedDay)}
          colorMapping={colorMapping}
        />
      ))}
    </ScrollView>
  );
};

export default HomeDaysScroll;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function getLastMonth(selectedMonth) {
  return new Date(
    new Date().getFullYear(),
    selectedMonth - 1,
    0,
  ).getDate(); 
}

function getDaysOfMonthInArray(lastMonthDay) {
  const daysList = [];

  for (let i = 1; i <= lastMonthDay; i++) {
    daysList.push(i);
  }

  return daysList;
}

function getCurrentMonth() {
  return new Date().getMonth();
}

function handleScrollEnd(event, setSelectedDay) {
  const horizontalPosition = event.nativeEvent.contentOffset.x;
  const selectedIndex = Math.round(horizontalPosition / dayWidth);

  setSelectedDay(selectedIndex + 1);
}

function scrollToDay(day, dayRef) {
  const horizontalPosition = (day - 1) * dayWidth;

  dayRef.current.scrollTo({
    x: horizontalPosition,
    y: 0,
    animated: true,
  });
}

function handleSelectDay(day, dayRef, setSelectedDay) {
  scrollToDay(day, dayRef);
  setSelectedDay(day);
}
