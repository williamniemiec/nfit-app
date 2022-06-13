import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import TrainingSet from '../TrainingSet';
import muscleMapping from '../muscles';
import AddButton from '../button/small/AddButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Trainings = ({style, data, onPress}) => {
  const [selectedOps, setSelectedOps] = useState([]);

  return (
    <FlatList
      style={[{width: '100%'}, style]}
      data={data}
      renderItem={(item, _) => (
        <TrainingItem
          id={item.item.id}
          name={item.item.name}
          exercises={item.item.exercises}
          selectedOps={selectedOps}
          setSelectedOps={setSelectedOps}
          onPress={onPress}
        />
      )}
    />
  );
}

export default Trainings;

const TrainingItem = ({ 
  id, 
  name, 
  exercises, 
  selectedOps, 
  setSelectedOps, 
  onPress 
}) => (
  <View key={id} style={styles.area}>
    <TrainingSet
      title={name}
      icons={generateMuscleListOfReactElements(exercises)}
    />
    <AddButton
      onPress={() => handlePress(
        id, 
        name, 
        exercises, 
        selectedOps, 
        setSelectedOps, 
        onPress
      )}
      selected={selectedOps.includes(id)}
    />
  </View>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function generateListOfReactElements(elements) {
  const rendered = [];
  
  elements.map((item, key) => {
    const component = React.createElement(item.type, {key: key});
    rendered.push(component);
  });

  return rendered;
}

function generateMuscleListOfReactElements(exercises) {
  const muscleNames = [];

  for (let exercise of exercises) {
    if (!muscleNames.includes(muscleMapping.get(exercise.muscle.toUpperCase()))) {
      muscleNames.push(muscleMapping.get(exercise.muscle.toUpperCase()));
    }
  }

  return generateListOfReactElements(muscleNames);
}

function handlePress(id, name, exercises, selectedOps, setSelectedOps, onPress) {
  const selected = !selectedOps.includes(id);

  if (selectedOps.includes(id))
    setSelectedOps((list) => {
      let newList = [...list];
      newList = newList.filter((item, _) => item != id);
      return newList;
    });
  else
    setSelectedOps((list) => {
      const newList = [...list];
      newList.push(id);
      return newList;
    });

  const workout = {id, name, exercises};

  onPress(workout, selected);
}
