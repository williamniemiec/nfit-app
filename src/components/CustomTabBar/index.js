/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const CustomTabBar = ({ state, descriptors, navigation }) => {
  if (shouldHideTabBar(state, descriptors)) {
    return (<></>);
  }

  return (
    <View style={styles.area}>
      {state.routes.map((route, index) => (
        <TabBarButton 
          key={index}
          options={descriptors[route.key].options}
          index={index}
          navigation={navigation}
          route={route}
          isFocused={state.index === index}
        />
      ))}
    </View>
  );
}

export default CustomTabBar;

const TabBarButton = ({ options, index, navigation, route, isFocused }) => {
  if (options.type === 'big') {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleRedirect(navigation, route)}
        style={styles.home}
        activeOpacity={1}
      >
        <Image style={styles.icon} source={options.icon} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      key={index}
      onPress={() => handleRedirect(navigation, route)}
      style={styles.btn}
    >
      <View style={styles.btnContent}>
        <TabBarButtonIcon options={options} />
        <Text style={[styles.label, isFocused ? styles.focused : null]}>
          { options.title ? options.title : route.name }
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TabBarButtonIcon = ({ options }) => {
  if (options.icon === undefined) {
    return null;
  }

  return (
    <Image style={styles.btnRegular} source={options.icon} />
  );  
};


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function shouldHideTabBar(state, descriptors) {
  for (let i = 0; i < state.routes.length; i++) {
    const indexActive = state.index;
    const isFocused = (indexActive === i);
    const options = descriptors[state.routes[i].key].options;

    if (!isTabBarVisible(options) && isFocused) {
      return true;
    }
  }

  return false;
}

function isTabBarVisible(options) {
  return (options.tabBarVisible === undefined || options.tabBarVisible);
}

function handleRedirect(navigation, route) {
  navigation.navigate(route.name);
}
