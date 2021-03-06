/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import globalStyles from '../../assets/styles/global';
import { translate } from '../../locales';
import CloseButton from '../../components/button/small/CloseButton';
import ExerciseItem from '../../components/ExerciseItem';
import FitnessBackground from '../../components/background/FitnessBackground';
import LocalStorageService from '../../services/LocalStorageService';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const PlayTrainingScreen = (props) => {
  const exercisesDone = new Set();
  const workout = props.route.params.workout;
  const navigation = useNavigation();
  const localStorageService = new LocalStorageService(useDispatch());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <FitnessBackground>
      <SafeAreaView style={styles.lightBackground}>
        <View style={globalStyles.container}>
          <Header workout={workout} navigation={navigation} />
          <WorkoutList 
            exercises={workout.exercises} 
            exercisesDone={exercisesDone} 
            workout={workout}
            localStorageService={localStorageService} 
            navigation={navigation}
          />
        </View>
      </SafeAreaView>
    </FitnessBackground>
  );
}

export default PlayTrainingScreen;

const Header = ({ navigation, workout }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{workout.name}</Text>
    <CloseButton light={true} onPress={() => navigation.goBack()} />
  </View>
);

const WorkoutList = ({ 
  exercises, 
  exercisesDone, 
  workout, 
  localStorageService, 
  navigation 
}) => (
  <FlatList
    style={styles.workoutList}
    data={exercises}
    renderItem={({item, index}) => (
      <ExerciseItem
        data={item}
        index={index + 1}
        onCheck={() => handleOnCheck(
          item, 
          exercisesDone, 
          exercises, 
          workout,
          localStorageService, 
          navigation
        )}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleOnCheck(
  exercise, 
  exercisesDone, 
  exercises, 
  workout, 
  localStorageService, 
  navigation
) {
  if (exercisesDone.has(exercise.id)) {
    exercisesDone.delete(exercise.id);
  } 
  else {
    exercisesDone.add(exercise.id);
  }

  if (isAllExercisesDone(exercisesDone, exercises)) {
    alert(translate('all_workouts_done'));
    localStorageService.markWorkoutAsDone(workout.id);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'HomeNavigator',
          },
        ],
      }),
    );
  }
}

function isAllExercisesDone(exercisesDone, exercises) {
  return (exercisesDone.size == exercises.length);
}
