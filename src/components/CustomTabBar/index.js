import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const CustomTabBar = ({state, descriptors, navigation}) => {
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
        style={styles.home}>
        <Image style={styles.icon} source={options.icon} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      key={index}
      onPress={() => handleRedirect(navigation, route)}
      style={styles.btn}>
      <View style={styles.btnContent}>
        {options.icon != undefined ? (
          <Image style={styles.btnRegular} source={options.icon} />
        ) : null}
        <Text style={[styles.label, isFocused ? styles.focused : null]}>
          { route.name }
        </Text>
      </View>
    </TouchableOpacity>
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
