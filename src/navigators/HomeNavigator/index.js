/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '../HomeStackNavigator';
import DoTrainingNavigator from '../DoTrainingNavigator';
import MyTrainingNavigator from '../MyTrainingNavigator';
import CustomTabBar from '../../components/CustomTabBar';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Tab.Navigator
    tabBar={(tabProps) => <CustomTabBar { ...tabProps } />}
    tabBarOptions={{keyboardHidesTabBar: true}}
    initialRouteName="HomeNavigator"
  >
    <Tab.Screen
      name="HomeNavigator"
      component={HomeStackNavigator}
      options={{
        title: 'Home',
        type: 'regular',
        icon: require('../../assets/images/home-white.png'),
      }}
    />
    <Tab.Screen
      name="DoTrainingNavigator"
      component={DoTrainingNavigator}
      options={{
        title: 'Play',
        type: 'big',
        icon: require('../../assets/images/dumbbell.png'),
        tabBarVisible: false,
      }}
    />
    <Tab.Screen
      name="MyTrainingNavigator"
      component={MyTrainingNavigator}
      options={{
        title: 'My Training',
        type: 'regular',
        icon: require('../../assets/images/myworkouts-white.png'),
      }}
    />
  </Tab.Navigator>
);

export default HomeNavigator;
