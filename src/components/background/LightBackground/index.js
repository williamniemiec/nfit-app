/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const LightBackground = ({ children }) => (
  <View 
    style={styles.background}
  >
    <StatusBar barStyle='dark-content' backgroundColor='#000' />
    { children }
  </View>
);

export default LightBackground;