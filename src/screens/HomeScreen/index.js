import React, { useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { translate } from '../../locales';
import styles from './styles';
import globalStyles from '../../assets/styles/global';
import colors from '../../assets/colors';
import ConfigButton from '../../components/button/small/ConfigButton';
import HomeMonthScroll from '../../components/HomeMonthScroll';
import HomeDaysScroll from '../../components/HomeDaysScroll';
import HomeDayStatus from '../../components/HomeDayStatus';
import { buildHeaderTransparent } from '../../components/HeaderTab';
import LightBackground from '../../components/background/LightBackground';
import LocalStorageService from '../../services/LocalStorageService';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const HomeScreen = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const localStorageService = new LocalStorageService(dispatch);
  const user = useSelector((state) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTransparent(
        null,
        <ConfigButton onPress={() => handleConfig(navigation)} />,
        translate('daily_progress'),
      ),
    );
  }, []);

  return (
    <LightBackground>
      <SafeAreaView style={globalStyles.container}>
        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <DaySelector
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          user={user}
          navigation={navigation}
          localStorageService={localStorageService}
        />
      </SafeAreaView>
    </LightBackground>
  );
}

export default HomeScreen;

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => (
  <HomeMonthScroll
    selectedMonth={selectedMonth}
    setSelectedMonth={setSelectedMonth}
    fgColor={colors.textPrimary}
    bgColorActive={colors.accent}
    bgColorInactive={`rgba(${colors.accentRgb},0.6)`}
  />
);

const DaySelector = ({
  selectedDay,
  selectedMonth,
  setSelectedDay,
  user,
  navigation,
  localStorageService
}) => {
  const colorMapping = {
    today: colors.dailyProgressToday,
    highlight: colors.dailyProgressDone,
    future: colors.dailyProgressFuture,
    past: colors.dailyProgressLost,
    invalid: colors.dailyProgressRest,
    text: colors.dailyProgressText,
  };

  return (
    <>
      <HomeDaysScroll
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={user.dailyProgress}
        workoutDays={user.workoutDays}
        colorMapping={colorMapping}
      />
      <HomeDayStatus
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={user.dailyProgress}
        workoutDays={user.workoutDays}
        addProgress={(date) => localStorageService.addDailyProgress(date)}
        deleteProgress={(date) =>localStorageService.removeDailyProgress(date)}
        goToWorkout={() => navigation.navigate('DoTrainingNavigator')}
      />
      <Legend colorMapping={colorMapping} />
    </>
  );
}

const Legend = ({ colorMapping }) => (
  <View style={styles.legendArea}>
    <Text style={styles.legendText}>
      { translate('legend') }:
    </Text>
    <LegendItem color={colorMapping.today} text={translate('today')} />
    <LegendItem
      color={colorMapping.highlight}
      text={translate('daily_workout_done')}
    />
    <LegendItem
      color={colorMapping.past}
      text={translate('daily_workout_lost')}
    />
    <LegendItem
      color={colorMapping.invalid}
      text={translate('daily_workout_rest')}
    />
    <LegendItem
      color={colorMapping.future}
      text={translate('daily_workout_future')}
    />
  </View>
);

const LegendItem = ({ color, text }) => {
  let itemColor = (color == undefined) ? '#ccc' : color;

  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendBox, { backgroundColor: itemColor }]}></View>
      <Text style={styles.legendText}>
        {text}
      </Text>
    </View>
  );
};


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleConfig(navigation) {
  navigation.navigate('ConfigScreen');
}
