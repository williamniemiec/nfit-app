/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const CloseButton = ({ onPress, light }) => {
  const color = { color: light ? 'white' : 'black' };

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={[styles.icon, color]}>
        X
      </Text>
    </TouchableOpacity>
  );
}

export default CloseButton;
