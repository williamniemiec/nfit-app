/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const TrainingSet = ({title, icons}) => {
  return (
    <View style={styles.left}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal={true} style={styles.icons}>
        { icons != undefined && icons }
      </ScrollView>
    </View>
  );
}

export default TrainingSet;
