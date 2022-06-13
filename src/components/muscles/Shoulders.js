import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function Shoulders() {
  return (
    <View style={styles.area}>
      <Image
        style={styles.image}
        source={require('../../assets/images/muscles/shoulders.png')}
      />
    </View>
  );
}
