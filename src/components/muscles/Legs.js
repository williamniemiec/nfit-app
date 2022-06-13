import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Legs = () => (
  <View style={styles.area}>
    <Image
      style={styles.image}
      source={require('../../assets/images/muscles/legs.png')}
    />
  </View>
);

export default Legs;