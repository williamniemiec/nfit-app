/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Image, ScrollView, TouchableHighlight } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const MuscleSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState('abs');

  return (
    <ScrollView
      style={styles.modalMuscles}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <Muscle
        name={'abs'}
        img={require('../../assets/images/muscles/abs.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'back'}
        img={require('../../assets/images/muscles/back.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'biceps'}
        img={require('../../assets/images/muscles/biceps.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'chest'}
        img={require('../../assets/images/muscles/chest.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'gluteal'}
        img={require('../../assets/images/muscles/gluteal.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'legs'}
        img={require('../../assets/images/muscles/legs.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'shoulders'}
        img={require('../../assets/images/muscles/shoulders.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
      <Muscle
        name={'triceps'}
        img={require('../../assets/images/muscles/triceps.png')}
        selected={selected}
        setSelected={setSelected}
        onSelect={onSelect}
      />
    </ScrollView>
  );
}

export default MuscleSelector;

const Muscle = ({ name, img, selected, setSelected, onSelect}) => {
  const OPACITY_SELECTED = 1;
  const OPACITY_UNSELECTED = 0.3;

  return (
    <TouchableHighlight
      style={[
        styles.modalMuscle,
        {
          opacity: (selected == name) ? OPACITY_SELECTED : OPACITY_UNSELECTED,
        },
      ]}
      onPress={() => handleSelect(name, onSelect, setSelected)}
      underlayColor="gray">
      <Image style={styles.modalMuscleImage} source={img} />
    </TouchableHighlight>
  );
};


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleSelect(muscle, onSelect, setSelected) {
  setSelected(muscle);
  onSelect(muscle);
}