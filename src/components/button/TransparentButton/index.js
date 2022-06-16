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
const TransparentButton = ({ title, onPress, fgColor = '#000000' }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={[styles.title, {color: fgColor}]}>
      { title }
    </Text>
  </TouchableOpacity>
);

export default TransparentButton;
