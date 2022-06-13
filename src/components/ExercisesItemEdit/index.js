import React from 'react';
import {TouchableHighlight, View, Text, Image} from 'react-native';
import Muscles from '../muscles';
import styles from './styles';
import {SwipeRow} from 'react-native-swipe-list-view';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default ({data, editExercise, removeExercise}) => {
  const LowerArea = () => (
    <TouchableHighlight
      style={styles.iconArea}
      onPress={removeExercise}
      underlayColor="red">
      <Image
        style={styles.icon}
        source={require('../../assets/images/trash-white.png')}
      />
    </TouchableHighlight>
  );

  const UpperArea = () => (
    <TouchableHighlight
      style={styles.area}
      onPress={editExercise}
      underlayColor="white">
      <>
        {Muscles[data.muscle]}
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{data.name}</Text>
          <Text style={styles.exerciseDetails}>
            {`${data.sets} séries - ${data.reps} rep ${
              data.load ? `- ${data.load} kg` : ``
            }`}
          </Text>
        </View>
      </>
    </TouchableHighlight>
  );

  return (
    <SwipeRow leftOpenValue={50} disableLeftSwipe={true}>
      <LowerArea />
      <UpperArea />
    </SwipeRow>
  );
};
