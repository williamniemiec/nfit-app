import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
// Not in workoutDays <=> invalidDays
// colorMapping: {
//   today,
//   highlightedDays,
//   futureDays,
//   pastDays,
//   invalid
//}
const Day = ({
  day,
  month,
  dailyProgress,
  workoutDays,
  onPress,
  colorMapping,
}) => {
  const [landscape, setLandscape] = useState(isLandscape());
  const [dayWidth, setDayWidth] = useState(0);

  if (colorMapping === undefined) {
    colorMapping = {
      today: 'red',
      highlight: 'purple',
      future: 'blue',
      past: 'green',
      invalid: '#555',
      text: 'white',
    };
  }

  useLayoutEffect(() => {
    Dimensions.addEventListener('change', ({ window: {width, height} })=>{
      setLandscape(width > height);
    });
  }, []);

  useLayoutEffect(() => {
    const screen = Math.round(Dimensions.get('window').width);

    setDayWidth(Math.round(screen / 9));
  }, [landscape]);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={[{ width: dayWidth }]}>
      <View style={[
        styles.dayItem, 
        buildColorStyle(colorMapping, month, day, workoutDays, dailyProgress)
      ]}>
        <Text style={[styles.dayText, { color: colorMapping.text }]}>
          { day }
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default Day;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isLandscape() {
  const dim = Dimensions.get('screen');
  
  return (dim.width >= dim.height);
}

function buildColorStyle(colorMapping, month, day, workoutDays, dailyProgress) {
  const today = getBeginTimeOfToday();
  const thisDate = getBeginTimeOf(today.getFullYear(), month, day);
  let opacity = 1;
  let bgColor = colorMapping.future;
  let borderColor = null;
  let borderWidth = 0;

  if (isRestDay(thisDate.getDay(), workoutDays)) {
    bgColor = colorMapping.invalid;
    opacity = 0.4;
  } 
  else {
    if (thisDate.getTime() <= today.getTime()) {
      const formattedDate = formatDate(thisDate);

      if (dailyProgress.includes(formattedDate)) {
        bgColor = colorMapping.highlight;
      } 
      else {
        bgColor = colorMapping.past;
      }
    }
  }

  if (thisDate.getTime() == today.getTime()) {
    borderColor = colorMapping.today;
    borderWidth = 4;
  }

  return {
    backgroundColor: bgColor,
    borderWidth: borderWidth,
    borderColor: borderColor,
    opacity: opacity,
  };
}

function isRestDay(day, workoutDays) {
  return !workoutDays.includes(day);
}

function getBeginTimeOfToday() {
  const today = new Date();

  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
}

function getBeginTimeOf(year, month, day) {
  return new Date(
    year,
    month,
    day,
    0,
    0,
    0,
    0,
  );
}

function formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}
