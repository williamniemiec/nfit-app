/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firestore from '@react-native-firebase/firestore';


/**
 * Responsible for providing workout services.
 */
export default {

  getWorkoutByLevel: async (level) => {
    let workoutsByLevel = [];
    const workouts = []
    
    const result = await firestore().collection('workout_level').get()

    result.forEach(async workoutLevelResult => {
      let workoutLevel = workoutLevelResult.data();
      
      if (workoutLevel.level !== level)
        return;  
      
      workoutLevel.workouts.forEach(async workoutResult => {
        workouts.push(workoutResult)
      })
    })

    for (let workoutResult of workouts) {
      let workoutResultItem = await workoutResult.get();
      let workout = workoutResultItem.data()
      let exercises = []

      for (let exerciseResult of workout.exercises) {
        let exercise = await exerciseResult.get();
        exercises.push({...exercise.data(), id: exercise.id});
      }

      workoutsByLevel.push({
        id: workoutResultItem.id,
        name: workout.name,
        exercises: exercises
      });
    }
    
    return workoutsByLevel;
  }
}
