import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styles from './styles';
import Day from './Day';


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
  const [landscape, setLandscape] = useState(isLandscape());
  const [dayWidth, setDayWidth] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);

  useLayoutEffect(() => {
    Dimensions.addEventListener('change', ({ window: {width, height} })=>{
      setLandscape(width > height);
    });
  }, []);

  useLayoutEffect(() => {
    const screen = Math.round(Dimensions.get('window').width);
    const day = Math.round(screen / 9);
    const offset = Math.round((screen - day) / 2);

    setDayWidth(day);
    setOffsetWidth(landscape ? offset + 10 : offset - 10);
    setTimeout(() => {
      // It is necessary because of ScrollView render time
      if (selectedMonth == getCurrentMonth()) {
        scrollToDay(selectedDay, dayRef, day);
      }
      else {
        scrollToDay(1, dayRef, day);
      }
    }, 100);
  }, [landscape]);

  useLayoutEffect(() => {
    const daysInMonth = getLastMonth(selectedMonth);

    setDays(getDaysOfMonthInArray(daysInMonth));
    setTimeout(() => {
      // It is necessary because of ScrollView render time
      if (selectedMonth == getCurrentMonth()) {
        scrollToDay(selectedDay, dayRef, dayWidth);
      }
      else {
        scrollToDay(1, dayRef, dayWidth);
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
      onMomentumScrollEnd={(event) => handleScrollEnd(event, setSelectedDay, dayWidth)}
      style={styles.area}>
      {days.map((day, _) => (
        <Day
          key={day}
          day={day}
          month={selectedMonth}
          dailyProgress={dailyProgress}
          workoutDays={workoutDays}
          onPress={() => handleSelectDay(day, dayRef, setSelectedDay, dayWidth)}
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
function isLandscape() {
  const dim = Dimensions.get('screen');
  
  return (dim.width >= dim.height);
}

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

function handleScrollEnd(event, setSelectedDay, dayWidth) {
  const horizontalPosition = event.nativeEvent.contentOffset.x;
  const selectedIndex = Math.round(horizontalPosition / dayWidth);

  setSelectedDay(selectedIndex + 1);
}

function scrollToDay(day, dayRef, dayWidth) {
  const horizontalPosition = (day - 1) * dayWidth;

  dayRef.current.scrollTo({
    x: horizontalPosition,
    y: 0,
    animated: true,
  });
}

function handleSelectDay(day, dayRef, setSelectedDay, dayWidth) {
  scrollToDay(day, dayRef, dayWidth);
  setSelectedDay(day);
}
