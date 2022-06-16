/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TouchableHighlight } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const OrkutButton = ({onPress, selected, color}) => {
  const colorTheme = (color === undefined) ? '#ed238e' : color;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={[
        styles.circleBtn,
        {
          borderColor: colorTheme,
          backgroundColor: selected ? colorTheme : null,
        },
      ]}>
      <></>
    </TouchableHighlight>
  );
}

export default OrkutButton;
