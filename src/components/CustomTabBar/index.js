import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import globalStyles from '../../assets/styles/global';
import {TouchableOpacity} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
function shouldHideTabBar(state, descriptors) {
  for (let i = 0; i < state.routes.length; i++) {
    const indexActive = state.index;
    const isFocused = indexActive === i;
    const options = descriptors[state.routes[i].key].options;

    if (!isTabBarVisible(options) && isFocused) {
      return true;
    }
  }

  return false;
}

function isTabBarVisible(options) {
  return options.tabBarVisible === undefined || options.tabBarVisible;
}

export default function CustomTabBar({state, descriptors, navigation}) {
  if (shouldHideTabBar(state, descriptors)) return <View></View>;

  return (
    <View style={styles.area}>
      {state.routes.map((route, index) => {
        const indexActive = state.index;
        const isFocused = indexActive === index;
        const options = descriptors[route.key].options;
        let label = route.name;

        if (options.tabBarLabel != undefined) label = options.tabBarLabel;
        else if (options.title != undefined) label = options.title;

        function handleRedirect() {
          navigation.navigate(route.name);
        }

        if (options.type === 'big') {
          return (
            <TouchableOpacity
              key={index}
              onPress={handleRedirect}
              style={styles.home}>
              <Image style={styles.icon} source={options.icon} />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              onPress={handleRedirect}
              style={styles.btn}>
              <View style={styles.btnContent}>
                {options.icon != undefined ? (
                  <Image style={styles.btnRegular} source={options.icon} />
                ) : null}
                <Text style={[styles.label, isFocused ? styles.focused : null]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
