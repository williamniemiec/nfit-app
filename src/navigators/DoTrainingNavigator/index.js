/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseTrainingScreen from '../../screens/ChooseTrainingScreen';
import PlayTrainingScreen from '../../screens/PlayTrainingScreen';
import { headerStyle } from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Stack = createStackNavigator();

const DoTrainingNavigator = () => (
  <Stack.Navigator screenOptions={headerStyle}>
    <Stack.Screen
      name="ChooseTrainingScreen"
      component={ChooseTrainingScreen}
    />
    <Stack.Screen 
      name="PlayTrainingScreen" 
      component={PlayTrainingScreen} 
    />
  </Stack.Navigator>
);

export default DoTrainingNavigator;