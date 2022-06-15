import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import ActionButton from '../button/ActionButton';
import RemainingTime from '../RemainingTime';
import { translate } from '../../locales';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const HomeDayStatus = ({
  selectedMonth,
  selectedDay,
  dailyProgress,
  workoutDays,
  addProgress,
  deleteProgress,
  goToWorkout,
}) => {
  const today = getBeginTimeOfToday();
  const thisDate = getBeginTimeOf(today.getFullYear(), selectedMonth, selectedDay);
  const dayFormatted = formatDate(thisDate);
  const isToday = (thisDate.getTime() == today.getTime());
  let dayOff = false;
  let isFuture = false;
  let isDone = false;

  if (!workoutDays.includes(thisDate.getDay())) {
    dayOff = true;
  } 
  else if (thisDate.getTime() > today.getTime()) {
    isFuture = true;
  } 
  else if (dailyProgress.includes(dayFormatted)) {
    isDone = true;
  }

  return (
    <View style={styles.area}>
      <View style={styles.ballonTriangle}></View>
      <View style={styles.ballonArea}>
        <DayOff display={dayOff} />
        <FutureDay display={isFuture} />
        <DoneMessage 
          display={!dayOff && !isFuture && isDone} 
          formattedDate={dayFormatted}
          deleteProgress={deleteProgress}
        />
        <LostMessage 
          display={!dayOff && !isFuture && !isDone && !isToday} 
          formattedDate={dayFormatted}
          addProgress={addProgress}
        />
        <TodayMessage 
          display={!dayOff && !isFuture && !isDone && isToday} 
          goToWorkout={goToWorkout} 
        />
      </View>
    </View>
  );
};

export default HomeDayStatus;

const DayOff = ({ display }) => {
  if (!display) {
    return <></>;
  }

  return (
    <Text style={styles.ballonBigText}>
      { translate('daily_workout_rest') }
    </Text>
  );
}

const FutureDay = ({ display }) => {
  if (!display) {
    return <></>;
  }

  return (
    <Text style={styles.ballonBigText}>
      { translate('daily_workout_future') }
    </Text>
  );
}

const DoneMessage = ({ display, formattedDate, deleteProgress }) => {
  if (!display) {
    return <></>;
  }

  return (
    <>
      <Text style={styles.ballonBigText}>
        { translate('daily_workout_done_message') }
      </Text>
      <ActionButton
        title={translate('unselect').toUpperCase()}
        onPress={() => deleteProgress(formattedDate)}
      />
    </>
  );
}

const LostMessage = ({ display, formattedDate, addProgress }) => {
  if (!display) {
    return <></>;
  }

  return (
    <>
      <Text style={styles.ballonBigText}>
        { translate('daily_workout_lost_message') }
      </Text>
      <ActionButton
        title={translate('mark_as_done').toUpperCase()}
        onPress={() => addProgress(formattedDate)}
      />
    </>
  );
}

const TodayMessage = ({ display, goToWorkout }) => {
  if (!display) {
    return <></>;
  }

  return (
    <>
      <Text style={styles.ballonBigText}>
        { translate('daily_workout_today_message')}
      </Text>
      <Text>
        { translate('remaining_time_message_pt1') } <RemainingTime />{' '}
        { translate('remaining_time_message_pt2') }
      </Text>
      <ActionButton
        style={styles.startWorkout}
        title={translate('start_workout').toUpperCase()}
        onPress={goToWorkout}
      />
    </>
  );
}


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
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