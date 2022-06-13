import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Chest = () => (
  <View style={styles.area}>
    <Image
      style={styles.image}
      source={require('../../assets/images/muscles/chest.png')}
    />
  </View>
);

export default Chest;