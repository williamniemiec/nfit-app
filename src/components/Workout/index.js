import React from 'react';
import TrainingSet from '../TrainingSet';
import { muscleMapping } from '../muscles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Workout = ({id, name, exercises}) => {
  return (
    <TrainingSet
      key={id}
      title={name}
      icons={
        exercises === undefined
          ? null
          : generateMuscleListOfReactElements(exercises)
      }
    />
  );
};

export default Workout;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function generateMuscleListOfReactElements(exercises) {
  const muscleNames = [];

  for (let exercise of exercises) {
    if (!muscleNames.includes(muscleMapping.get(exercise.muscle.toUpperCase()))) {
      muscleNames.push(muscleMapping.get(exercise.muscle.toUpperCase()));
    }
  }

  return generateListOfReactElements(muscleNames);
}

function generateListOfReactElements(elements) {
  const rendered = [];
  
  elements.map((item, key) => {
    rendered.push(React.createElement(item.type, { key }));
  });

  return rendered;
}