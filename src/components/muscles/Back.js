import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Back = () => (
  <View style={styles.area}>
    <Image
      style={styles.image}
      source={require('../../assets/images/muscles/back.png')}
    />
  </View>
);

export default Back;
