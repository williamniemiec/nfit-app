/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const AddButton = ({onPress, selected}) => {
  const icon = selected
    ? require('../../../../assets/images/check-white.png')
    : require('../../../../assets/images/add-white.png');

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image style={styles.icon} source={icon} />
    </TouchableOpacity>
  );
}

export default AddButton;
