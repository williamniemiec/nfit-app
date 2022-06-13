import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function GymEquipmentBackground({ children }) {
  
  return (
    <ImageBackground 
      style={styles.background} 
      source={require("../../../assets/images/gym-equipment.jpg")} 
      resizeMode="cover" 
      blurRadius={1}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000' />
      {children}
    </ImageBackground>
  );
}
