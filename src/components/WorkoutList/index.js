/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TrainingSet from '../TrainingSet';
import { muscleMapping } from '../muscles';
import presetWorkouts from '../../assets/presetWorkouts.json';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const workoutList = new Map();


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const TrainingItem = ({id, name, exercises}) => {
  return (
    <TrainingSet
      title={name}
      icons={generateMuscleListOfReactElements(exercises)}
    />
  );
};


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function generateListOfReactElements(elements) {
  const rendered = [];
  
  elements.map((item, key) => {
    rendered.push(React.createElement(item.type, {key: key}));
  });

  return rendered;
}

export function generateMuscleListOfReactElements(exercises) {
  const muscleNames = [];

  for (let exercise of exercises) {
    if (!muscleNames.includes(muscleMapping.get(exercise.muscle.toUpperCase())))
      muscleNames.push(muscleMapping.get(exercise.muscle.toUpperCase()));
  }

  return generateListOfReactElements(muscleNames);
}

export default function generateWorkoutList() {
  for (let workout of presetWorkouts) {
    addWorkout(workout);
  }

  return workoutList;
}

function addWorkout(workout) {
  const workoutComponent = (
    <TrainingItem
      item={workout}
      id={workout.id}
      name={workout.name}
      exercises={workout.exercises}
    />
  );

  workoutList.set(workout.id, workoutComponent);
}