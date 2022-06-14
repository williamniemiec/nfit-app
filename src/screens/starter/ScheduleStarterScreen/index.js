import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WeekdaySelector from '@wniemiec-component-reactnative/weekday-selector';
import styles from './styles';
import globalStyles from '../../../assets/styles/global';
import colors from '../../../assets/colors';
import { translate } from '../../../locales';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import TheManBackground from '../../../components/background/TheManBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ScheduleStarterScreen = (props) => {
  const [workoutDays, setWorkoutDays] = useState(new Set());
  const navigation = useNavigation();
  const name = props.route.params.name.split(' ')[0];

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabDark(
        () => handleGoBack(navigation),
        () => handleGoNext(navigation, name, workoutDays), 
      )
    );
  }, []);

  return (
    <TheManBackground>
      <SafeAreaView style={[globalStyles.container, globalStyles.panel]}>
        <View style={[styles.area]}>
          <Header name={name} />
          <WeekdaySelector 
            onPress={(dayWeek, selected) => handleWeekDay(dayWeek, selected, setWorkoutDays)} 
            bgColor={colors.accent} 
            fgColor={colors.textPrimary} 
          />
          <Text style={globalStyles.message}>
            {translate('edit_note')}
          </Text>
        </View>
      </SafeAreaView>
    </TheManBackground>
  );
}

export default ScheduleStarterScreen;

const Header = ({ name }) => (
  <View style={styles.messages}>
    <SelectedScheduleMessage name={name} />
    <Text style={globalStyles.message}>
      {translate('question_week_days')}
    </Text>
  </View>
);

const SelectedScheduleMessage = ({ name }) => (
  <Text style={globalStyles.message}>
    { translate('welcome_message_pt1') } <HighlightedText text={name} /> { translate('welcome_message_pt2') }
  </Text>
);

const HighlightedText = ({ text }) => (
  <Text style={globalStyles.highlight}>
    {text}
  </Text>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleGoNext(navigation, name, workoutDays) {
  
  
  if (workoutDays.size == 0) {
    alert(translate('select_minimum_level'));
  }
  else {
    const workoutDaysList = [];

    workoutDays.forEach((item, _) => workoutDaysList.push(item));

    navigation.navigate('LevelStarterScreen', {
      name, 
      workoutDays: workoutDaysList
    });
  }
}

function handleGoBack(navigation) {
  navigation.goBack();
}

function handleWeekDay(dayWeek, selected, setWorkoutDays) {
  setWorkoutDays(set => {
    if (selected) {
      set.add(dayWeek);
    }
    else {
      set.delete(dayWeek);
    }

    return set;
  });
}