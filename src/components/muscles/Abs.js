import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Abs = () => (
  <View style={styles.area}>
    <Image
      style={styles.image}
      source={require('../../assets/images/muscles/abs.png')}
    />
  </View>
);

export default Abs;