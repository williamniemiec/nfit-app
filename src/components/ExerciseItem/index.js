import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Muscles from '../muscles';
import CheckButton from '../button/small/CheckButton';
import { translate } from '../../locales';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ExerciseItem = ({data, index, onCheck}) => {
  const [done, setDone] = useState(false);

  return (
    <View style={styles.area}>
      <View style={styles.exercise}>
        <Text style={styles.index}>{index}. </Text>
        { Muscles[data.muscle] }
        <Details data={data} />
      </View>
      <CheckButton 
        onPress={() => handleCheckExercise(done, setDone, onCheck)} 
        selected={done} 
      />
    </View>
  );
}

export default ExerciseItem;

const Details = ({ data }) => (
  <View style={styles.exerciseInfo}>
    <Text style={styles.exerciseName}>
      { data.name }
    </Text>
    <Text style={styles.exerciseDetails}>
      { buildWorkoutDetails(data) }
    </Text>
  </View>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function buildWorkoutDetails(data) {
  let details = `${data.sets} ${translate('workout_detail_sets')} - `;

  details += `${data.reps} ${translate('workout_detail_reps')} `;

  if (data.load) {
    details += `- ${data.load} ${translate('workout_detail_weight')}`;
  }

  return details;
}

function handleCheckExercise(done, setDone, onCheck) {
  setDone(!done);
  onCheck();
}