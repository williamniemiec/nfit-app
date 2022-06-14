import React, { useLayoutEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import globalStyles from '../../assets/styles/global';
import { translate } from '../../locales';
import AddButton from '../../components/button/small/AddButton';
import EditButton from '../../components/button/small/EditButton';
import TrashButton from '../../components/button/small/TrashButton';
import Workout from '../../components/Workout';
import { buildHeaderTabAccent } from '../../components/HeaderTab';
import BarbellBackground from '../../components/background/BarbellBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const MyTrainingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabAccent(
        null,
        <AddButton onPress={() => navigation.navigate('EditWorkoutScreen')} />,
        translate('my_workouts'),
      ),
    );
  }, []);

  return (
    <BarbellBackground>
      <ScrollView style={[globalStyles.container, styles.body]}>
        {user.myWorkouts.map((workout, index) => (
          <Training 
            key={index}
            index={index}
            workout={workout} 
            navigation={navigation} 
            dispatch={dispatch} 
          />
        ))}
      </ScrollView>
    </BarbellBackground>
  );
}

export default MyTrainingScreen;

const Training = ({ index, workout, navigation, dispatch }) => (
  <View style={styles.area} key={index}>
    <Workout
      id={workout.id}
      name={workout.name}
      exercises={workout.exercises}
    />
    <View style={styles.actions}>
      <EditButton onPress={() => handleEditWorkout(workout, navigation)} />
      <TrashButton onPress={() => handleDeleteWorkout(workout, dispatch)} />
    </View>
  </View>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleEditWorkout(workout, navigation) {
  navigation.navigate('EditWorkoutScreen', { workout });
}

function handleDeleteWorkout(workoutId, dispatch) {
  Alert.alert(
    translate('remove_workout'),
    translate('remove_workout_confirmation'),
    [
      {
        text: translate('no'),
        onPress: null,
      },
      {
        text: translate('yes'),
        onPress: () =>
          dispatch({
            type: 'DEL_MY_WORKOUTS',
            payload: { workoutId: workoutId },
          }),
      },
    ],
    { cancelable: false },
  );
}
