import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConfigButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image
        style={styles.icon}
        source={require('../../../../assets/images/config.png')}
      />
    </TouchableOpacity>
  );
}

export default ConfigButton;