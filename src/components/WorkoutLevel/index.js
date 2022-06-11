import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import FlatButton from '../button/FlatButton';
import SelectableButton from '@wniemiec-component-reactnative/selectable-button';
import { translate } from '../../locales';

export default function WorkoutLevel({ onPress, funny, selected, full }) {
  const [selectedOp, setSelectedOp] = useState(-1)

  if (funny === undefined)
    funny = false

  const titles = [
    funny ? translate('workout_level_easy_funny') : translate('workout_level_easy'),
    funny ? translate('workout_level_normal_funny') : translate('workout_level_normal'),
    funny ? translate('workout_level_hard_funny') : translate('workout_level_hard')
  ]
  

  function handlePress(op) {
    setSelectedOp(op)
    onPress(op)
  }

  const OptionButton = ({ option }) => (
    <SelectableButton 
      selected={selectedOp == option} 
      title={titles[option-1]} 
      onPress={() => handlePress(option)} 
      fgColor='white' 
      bgColor='#e5810c' 
      size='small'
      full={full}
    />
  );

  useEffect(() => {
    if (selected != undefined) {
      setSelectedOp(selected)
    }
  }, [])

  return (
    <View style={styles.area}>
      <OptionButton option={1} />
      <OptionButton option={2} />
      <OptionButton option={3} />
    </View>
  )
}