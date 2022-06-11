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


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const PlayTrainingScreen = (props) => {

  const exercisesDone = new Set();
  const workout = props.route.params.workout;
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
            dispatch={dispatch} 
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

const WorkoutList = ({ exercises, exercisesDone, dispatch, navigation }) => (
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
          dispatch, 
          navigation)
        }
      />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleOnCheck(exercise, exercisesDone, exercises, dispatch, navigation) {
  if (exercisesDone.has(exercise.id)) {
    exercisesDone.delete(exercise.id);
  } 
  else {
    exercisesDone.add(exercise.id);
  }

  if (isAllExercisesDone(exercisesDone, exercises)) {
    alert(translate('all_workouts_done'));

    dispatch({
      type: 'ADD_DAILY_PROGRESS',
      payload: {date: getCurrentDate()},
    });
    dispatch({
      type: 'SET_LAST_WORKOUT',
      payload: {workout: workout.id},
    });

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

function getCurrentDate() {
  const today = new Date();
  let thisYear = today.getFullYear();
  let thisMonth = today.getMonth() + 1;
  let thisDay = today.getDate();

  if (thisMonth < 10) {
    thisMonth = '0' + thisMonth;
  }

  if (thisDay < 10) {
    thisDay = '0' + thisDay;
  }

  return `${thisYear}-${thisMonth}-${thisDay}`;
}

function isAllExercisesDone(exercisesDone, exercises) {
  return (exercisesDone.size == exercises.length);
}
