import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import SelectableButton from '@wniemiec-component-reactnative/selectable-button';
import { translate } from '../../locales';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const WorkoutLevel = ({ onPress, funny, selected, full }) => {
  const [selectedOp, setSelectedOp] = useState(-1);
  const titles = buildTitles(funny);

  useEffect(() => {
    if (selected != undefined) {
      setSelectedOp(selected);
    }
  }, []);

  return (
    <View style={styles.area}>
      <OptionButton 
        option={1} 
        selectedOp={selectedOp}
        setSelectedOp={setSelectedOp}
        titles={titles}
        onPress={onPress}
        full={full}
      />
      <OptionButton 
        option={2}
        selectedOp={selectedOp}
        setSelectedOp={setSelectedOp}
        titles={titles}
        onPress={onPress}
        full={full}
      />
      <OptionButton 
        option={3} 
        selectedOp={selectedOp}
        setSelectedOp={setSelectedOp}
        titles={titles}
        onPress={onPress}
        full={full}
      />
    </View>
  )
}

export default WorkoutLevel;

const OptionButton = ({ option, selectedOp, setSelectedOp, titles, onPress, full }) => (
  <SelectableButton 
    selected={selectedOp == option} 
    title={titles[option-1]} 
    onPress={() => handlePress(option, onPress, setSelectedOp)} 
    fgColor='white' 
    bgColor='#e5810c' 
    size='small'
    full={full}
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function buildTitles(funny) {
  const funnyText = (funny === undefined) ? false : funny;

  return [
    funnyText ? translate('workout_level_easy_funny') : translate('workout_level_easy'),
    funnyText ? translate('workout_level_normal_funny') : translate('workout_level_normal'),
    funnyText ? translate('workout_level_hard_funny') : translate('workout_level_hard')
  ];
}

function handlePress(op, onPress, setSelectedOp) {
  setSelectedOp(op)
  onPress(op)
}
