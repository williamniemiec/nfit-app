import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native'
import styles from './styles'
import globalStyles from '../../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import Trainings from '../../../components/Trainings'
import { CommonActions } from '@react-navigation/native'
import WorkoutService from '../../../services/WorkoutService';
import { translate } from '../../../locales';
import TheManBackground from '../../../components/background/TheManBackground';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import colors from '../../../assets/colors';

export default function TrainingScreen(props) {
  const navigation = useNavigation()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true);
  const [prebuiltWorkouts, setPrebuiltWorkouts] = useState([]);
  const [nextBtnLabel, setNextBtnLabel] = useState('')
  const [totWorkout, setTotWorkout] = useState(0);
  const totalDays = props.route.params.totalDays;
  const level = props.route.params.level;

  const handleGoNext = () => {
    // Disables 'back' button
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "HomeNavigator",
            params: { ...props.route.params, totWorkout, workout: workouts }
          }
        ]
      })
    )
  }

  function handleGoBack() {
    props.navigation.goBack();
  }

  useEffect(() => {
    setNextBtnLabel(workouts.size == 0 ? translate('ignore') : translate('finish'))
  
    WorkoutService.getWorkoutByLevel(level).then((results) => {
      setLoading(false);
      setPrebuiltWorkouts(results);
    });
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions(buildHeaderTabDark(handleGoBack, handleGoNext));
  }, [nextBtnLabel]);

  function handleTrainingSelect(workout, selected) {
    setWorkouts(workoutList => {
      const newWorkoutList = workoutList

      if (selected)
        newWorkoutList.push(workout)
      else {
        const index = newWorkoutList.findIndex(e => e.id == workout.id)
        newWorkoutList.pop(index)
      }

      setNextBtnLabel(newWorkoutList.length == 0 ? translate('ignore') : translate('finish'))
      setTotWorkout(newWorkoutList.length)

      return newWorkoutList
    })
  }

  return (
    <TheManBackground>
      <SafeAreaView style={[styles.area, globalStyles.panel]}>
        <View style={styles.messages}>
          <Text style={globalStyles.message}>{translate('workout_options')}</Text>
          <Text style={globalStyles.message}>{translate('workout_total_selected_pt1')} {totWorkout} {translate('workout_total_selected_pt2')}</Text>
        </View>
        {loading 
          ? <ActivityIndicator color={colors.accent} size='large' /> 
          : <Trainings data={prebuiltWorkouts} style={styles.trainings} onPress={handleTrainingSelect} />
        }
      </SafeAreaView>
    </TheManBackground>
  )
}