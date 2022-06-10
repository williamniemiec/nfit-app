import React, { useLayoutEffect, useRef, useState } from 'react';
import globalStyles from '../../../assets/styles/global';
import { SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import WorkoutLevel from '../../../components/WorkoutLevel';
import { useSelector } from 'react-redux';
import { translate } from '../../../locales';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import TheManBackground from '../../../components/background/TheManBackground';
import colors from '../../../resources/colors';

export default function WelcomeScreen(props) {

  const [level, setLevel] = useState(-1);
  const navigation = useNavigation();
  const levelRef = useRef(level);
  const totalDays = props.route.params.workoutDays.length;

  function handleGoNext() {
    if (levelRef.current < 0)
      alert(translate('select_level'));
    else
      navigation.navigate('WorkoutStarterScreen', {
        ...props.route.params, level: levelRef.current, totalDays
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleLevel(newName) {
    setLevel(newName);
    levelRef.current = newName;
  }

  useLayoutEffect(() => {
    navigation.setOptions(buildHeaderTabDark(handleGoBack, handleGoNext));
  }, []);

  return (
    <TheManBackground>
      <SafeAreaView style={[globalStyles.container, globalStyles.panel]}>
        <View style={[styles.area]}>
          <View style={styles.messages}>
            <Text style={[globalStyles.message, globalStyles.highlight]}>{generateScheduleMessage(totalDays)}</Text>
            <Text style={globalStyles.message}>{translate('question_level')}</Text>
          </View>
          <WorkoutLevel onPress={handleLevel} funny={true} bgColor={colors.accent} fgColor={colors.textPrimary} />
          <Text style={globalStyles.message}>{translate('edit_note')}</Text>
        </View>
      </SafeAreaView>
    </TheManBackground>
  );
}

function generateScheduleMessage(totalDays) {
  switch (totalDays) {
    case 1:
      return translate('select_level_1');
    case 2:
      return `${translate('select_level_2_pt1')} ${totalDays} ${translate('select_level_2_pt2')}`;
    case 3:
      return `${translate('select_level_3_pt1')} ${totalDays} ${translate('select_level_3_pt2')}`;
    case 4:
      return `${translate('select_level_4_pt1')} ${totalDays} ${translate('select_level_4_pt2')}`;
    case 5:
      return translate('select_level_5');
    case 6:
      return `${totalDays} ${translate('select_level_6_pt2')}`;
    case 7:
      return `${totalDays} ${translate('select_level_7_pt2')}`;
  }
}
