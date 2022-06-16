/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerStyle } from './styles.js';
import WelcomeStarterScreen from '../../screens/starter/WelcomeStarterScreen';
import NameStarterScreen from '../../screens/starter/NameStarterScreen';
import ScheduleStarterScreen from '../../screens/starter/ScheduleStarterScreen';
import LevelStarterScreen from '../../screens/starter/LevelStarterScreen';
import WorkoutStarterScreen from '../../screens/starter/WorkoutStarterScreen';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const StackNavigator = createStackNavigator();

const WelcomeNavigator = () => (
  <StackNavigator.Navigator screenOptions={headerStyle}>
    <StackNavigator.Screen
      name="WelcomeStarterScreen"
      component={WelcomeStarterScreen}
    />
    <StackNavigator.Screen
      name="NameStarterScreen"
      component={NameStarterScreen}
    />
    <StackNavigator.Screen
      name="ScheduleStarterScreen"
      component={ScheduleStarterScreen}
    />
    <StackNavigator.Screen
      name="LevelStarterScreen"
      component={LevelStarterScreen}
    />
    <StackNavigator.Screen
      name="WorkoutStarterScreen"
      component={WorkoutStarterScreen}
    />
  </StackNavigator.Navigator>
);

export default WelcomeNavigator;
