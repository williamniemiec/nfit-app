import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const BarbellBackground = ({ children }) => (
  <ImageBackground 
    style={styles.background} 
    source={require("../../../assets/images/barbell.jpg")} 
    resizeMode="cover" 
    blurRadius={1}
  >
    <StatusBar barStyle='light-content' backgroundColor='#000' />
    { children }
  </ImageBackground>
);

export default BarbellBackground;
