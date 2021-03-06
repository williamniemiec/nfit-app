/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import styles from './styles';
import globalStyles from '../../../assets/styles/global';
import colors from '../../../assets/colors';
import { translate } from '../../../locales';
import Trainings from '../../../components/Trainings';
import TheManBackground from '../../../components/background/TheManBackground';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import WorkoutService from '../../../services/WorkoutService';
import LocalStorageService from '../../../services/LocalStorageService';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const WorkoutStarterScreen = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prebuiltWorkouts, setPrebuiltWorkouts] = useState([]);
  const [nextBtnLabel, setNextBtnLabel] = useState('');
  const [totalWorkouts, setTotWorkout] = useState(0);
  const navigation = useNavigation();
  const localStorageService = new LocalStorageService(useDispatch());

  useEffect(() => {
    setNextBtnLabel((workouts.size == 0) ? translate('ignore') : translate('finish'))
  
    WorkoutService
      .getWorkoutByLevel(props.route.params.level)
      .then((results) => {
        setLoading(false);
        setPrebuiltWorkouts(results);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabDark(
        () => handleGoBack(props), 
        () => handleGoNext(props, workouts, localStorageService)
      )
    );
  }, [nextBtnLabel]);

  return (
    <TheManBackground>
      <SafeAreaView style={[styles.area, globalStyles.panel]}>
        <Header total={totalWorkouts} />
        <WorkoutList 
          prebuiltWorkouts={prebuiltWorkouts}
          onSelect={(workout, selected) => handleWorkoutSelect(
            workout, 
            selected, 
            setWorkouts, 
            setNextBtnLabel, 
            setTotWorkout
          )}
          loading={loading}
        />
      </SafeAreaView>
    </TheManBackground>
  )
}

export default WorkoutStarterScreen;

const Header = ({ totalWorkouts }) => (
  <View style={styles.messages}>
    <Text style={globalStyles.message}>
      { translate('workout_options') }
      </Text>
    <SelectedWorkoutsMessage total={totalWorkouts} />
  </View>
);

const SelectedWorkoutsMessage = ({ total }) => {
  const message = translate('workout_total_selected_pt1')
    + ` ${total} `
    + translate('workout_total_selected_pt2');

  return (
    <Text style={globalStyles.message}>
      { message }
    </Text>
  );
}

const WorkoutList = ({ prebuiltWorkouts, onSelect, loading }) => {
  if (loading) {
    return <ActivityIndicator color={colors.accent} size='large' />;
  }

  return (
    <Trainings 
      data={prebuiltWorkouts} 
      style={styles.trainings} 
      onPress={onSelect} 
    />
  );
}


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleGoNext(props, workouts, localStorageService) {
  if (!isNameSet(props)) {
    return;
  }

  localStorageService.newUser(
    props.route.params.name,
    props.route.params.level,
    props.route.params.workoutDays,
    workouts
  );
}

function isNameSet(props) {
  return  (props.route != undefined) 
          || (props.route.params.name != undefined);
}

function handleGoBack(props) {
  props.navigation.goBack();
}

function handleWorkoutSelect(workout, selected, setWorkouts, setNextBtnLabel, setTotWorkout) {
  setWorkouts(workoutList => {
    const newWorkoutList = workoutList;

    if (selected) {
      newWorkoutList.push(workout);
    }
    else {
      const index = newWorkoutList.findIndex(e => e.id == workout.id);
      newWorkoutList.pop(index);
    }

    setNextBtnLabel((newWorkoutList.length == 0) ? translate('ignore') : translate('finish'));
    setTotWorkout(newWorkoutList.length);

    return newWorkoutList;
  })
}

