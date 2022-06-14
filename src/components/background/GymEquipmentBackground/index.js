import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const GymEquipmentBackground = ({ children }) => (
  <ImageBackground 
    style={styles.background} 
    source={require("../../../assets/images/gym-equipment.jpg")} 
    resizeMode="cover" 
    blurRadius={1}
  >
    <StatusBar barStyle='light-content' backgroundColor='#000' />
    { children }
  </ImageBackground>
);

export default GymEquipmentBackground;
