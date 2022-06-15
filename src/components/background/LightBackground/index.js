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