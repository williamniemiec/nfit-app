/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerStyle } from './styles';
import MyTrainingScreen from '../../screens/MyTrainingScreen';
import EditWorkoutScreen from '../../screens/EditWorkoutScreen';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen
        name="MyTrainingScreen"
        component={MyTrainingScreen}
        options={{title: 'My Training'}}
      />
      <Stack.Screen
        name="EditWorkoutScreen"
        component={EditWorkoutScreen}
        options={{title: 'Edit Training'}}
      />
    </Stack.Navigator>
  );
};
