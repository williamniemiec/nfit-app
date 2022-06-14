import React, { useState, useLayoutEffect } from 'react';
import { View, SafeAreaView, TextInput, FlatList } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuid } from 'uuid';
import styles from './styles';
import { translate } from '../../locales';
import globalStyles from '../../assets/styles/global';
import colors from '../../assets/colors';
import EditExerciseModal from './EditExerciseModal';
import SaveButton from '../../components/button/small/SaveButton';
import ActionButton from '../../components/button/ActionButton';
import TransparentButton from '../../components/button/TransparentButton';
import ExercisesItemEdit from '../../components/ExercisesItemEdit';
import { buildHeaderTabAccent } from '../../components/HeaderTab';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const EditWorkoutScreen = (props) => {
  const isNew = (props.route.params === undefined);
  const workout = isNew ? [] : props.route.params.workout;
  const id = isNew ? uuid() : workout.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState(isNew ? '' : workout.name);
  const [exercises, setExercises] = useState(getWorkoutExercises(isNew, workout));
  const [editExercise, setEditExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabAccent(
        <TransparentButton
          title={`< ${translate('back')}`}
          onPress={() => handleGoBack(navigation)}
          fgColor={colors.textPrimary}
        />,
        <SaveButton onPress={() => handleSave(
          navigation, 
          dispatch, 
          isNew, 
          id, 
          name, 
          exercises
        )} />,
        isNew ? translate('add_workout') : translate('edit_workout'),
      ),
    );
  }, [name]);

  return (
    <SafeAreaView style={[globalStyles.container, styles.body]}>
      <EditExerciseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={(
          modalId, 
          modalName, 
          modalMuscle, 
          modalSets, 
          modalReps, 
          modalLoad
        ) => handleModalSave(
          modalId, 
          modalName,
          modalMuscle, 
          modalSets, 
          modalReps, 
          modalLoad, 
          isNew,
          exercises, 
          setExercises
        )}
        exercise={editExercise}
      />
      <ExerciseName name={name} setName={setName} />
      <View style={styles.exercisesArea}>
        <NewExerciseButton onPress={() => handleAddExercise(
          setEditExercise, 
          setModalVisible
        )} />
        <Exercises 
          exercises={exercises} 
          setExercises={setExercises}
          setEditExercise={setEditExercise} 
          setModalVisible={setModalVisible} 
        />
      </View>
    </SafeAreaView>
  );
};

export default EditWorkoutScreen;

const ExerciseName = ({ name, setName }) => (
  <TextInput
    style={styles.input}
    value={name}
    onChangeText={setName}
    placeholder={translate('name')}
  />
);

const NewExerciseButton = ({ onPress }) => (
  <ActionButton
    bgColor={colors.accent}
    title={translate('add_workout')}
    onPress={onPress}
  />
);

const Exercises = ({ exercises, setExercises, setEditExercise, setModalVisible }) => (
  <FlatList
    style={styles.exercisesList}
    data={exercises}
    renderItem={({ item }) => (
      <ExercisesItemEdit
        data={item}
        editExercise={() => handleEditExercise(item, setEditExercise, setModalVisible)}
        removeExercise={() => removeExercise(item, exercises, setExercises)}
      />
    )}
    keyExtractor={(item) => item.name}
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function getWorkoutExercises(isNew, workout) {
  if (isNew || (workout.exercises === undefined)) {
    return [];
  }

  return workout.exercises;
}

function handleGoBack(navigation) {
  navigation.goBack();
}

function handleSave(navigation, dispatch, isNew, id, name, exercises) {
  if (name == '') {
    alert(translate('workout_name_required'));
    return;
  }

  if (isNew) {
    dispatch({
      type: 'ADD_MY_WORKOUTS',
      payload: {
        id: id,
        name: name,
        exercises: exercises,
      },
    });
  } else {
    dispatch({
      type: 'UPDATE_MY_WORKOUTS',
      payload: {
        id: id,
        name: name,
        exercises: exercises,
      },
    });
  }
  navigation.goBack();
};

function handleModalSave(
  modalId,
  modalName,
  modalMuscle,
  modalSets,
  modalReps,
  modalLoad,
  isNew,
  exercises,
  setExercises
) {
  if (isNew) {
    exercises.push({
      id: uuid(),
      name: modalName,
      muscle: modalMuscle,
      sets: modalSets,
      reps: modalReps,
      load: modalLoad,
    });
  } 
  else {
    const index = exercises.findIndex((e) => e.id == modalId);

    if (index > -1) {
      exercises[index].name = modalName;
      exercises[index].muscle = modalMuscle;
      exercises[index].sets = modalSets;
      exercises[index].reps = modalReps;
      exercises[index].load = modalLoad;
    } 
    else {
      exercises.push({
        id: uuid(),
        name: modalName,
        muscle: modalMuscle,
        sets: modalSets,
        reps: modalReps,
        load: modalLoad,
      });
    }
  }

  setExercises(exercises);
}

function handleAddExercise(setEditExercise, setModalVisible) {
  setEditExercise(null);
  setModalVisible(true);
}

function removeExercise(exercise, exercises, setExercises) {
  const newExercises = exercises.filter((ex) => ex.id != exercise.id);

  setExercises(newExercises);
}

function handleEditExercise(exercise, setEditExercise, setModalVisible) {
  setEditExercise(exercise);
  setModalVisible(true);
}