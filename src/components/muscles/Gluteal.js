import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Gluteal = () => {
  return (
    <View style={styles.area}>
      <Image
        style={styles.image}
        source={require('../../assets/images/muscles/gluteal.png')}
      />
    </View>
  );
}

export default Gluteal;
