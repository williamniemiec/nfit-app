import React from 'react';
import  { View, Image } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Triceps = () => (
  <View style={styles.area}>
    <Image
      style={styles.image}
      source={require('../../assets/images/muscles/triceps.png')}
    />
  </View>
);

export default Triceps;
