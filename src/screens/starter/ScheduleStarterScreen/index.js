import React, { useLayoutEffect, useState } from 'react';
import globalStyles from '../../../assets/styles/global';
import { SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { translate } from '../../../locales';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import WeekdaySelector from '@wniemiec-component-reactnative/weekday-selector';
import TheManBackground from '../../../components/background/TheManBackground';
import colors from '../../../assets/colors';

export default function ScheduleScreen(props) {

  const [workoutDays, setWorkoutDays] = useState(new Set());
  const navigation = useNavigation();
  let name = props.route.params.name;
  name = name.split(' ')[0];

  function handleGoNext() {
    if (workoutDays.size == 0) {
      alert(translate('select_minimum_level'));
    }
    else {
      const workoutDaysList = [];

      workoutDays.forEach((item, index) => workoutDaysList.push(item));

      navigation.navigate('LevelStarterScreen', {
        name, workoutDays: workoutDaysList
      });
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleWeekDay(dayWeek, selected) {
    setWorkoutDays(set => {
      if (selected)
        set.add(dayWeek);
      else
        set.delete(dayWeek);

      return set;
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions(buildHeaderTabDark(handleGoBack, handleGoNext));
  }, []);

  return (
    <TheManBackground>
      <SafeAreaView style={[globalStyles.container, globalStyles.panel]}>
        <View style={[styles.area]}>
          <View style={styles.messages}>
            <Text style={globalStyles.message}>{translate('welcome_message_pt1')} <Text style={globalStyles.highlight}>{name}</Text>{translate('welcome_message_pt2')}</Text>
            <Text style={globalStyles.message}>{translate('question_week_days')}</Text>
          </View>
          <WeekdaySelector onPress={handleWeekDay} bgColor={colors.accent} fgColor={colors.textPrimary} />
          <Text style={globalStyles.message}>{translate('edit_note')}</Text>
        </View>
      </SafeAreaView>
    </TheManBackground>
  );
}
