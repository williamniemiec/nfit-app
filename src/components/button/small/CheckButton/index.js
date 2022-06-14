import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const CheckButton = ({ onPress, selected }) => {
  const icon = selected
    ? require('../../../../assets/images/check-white.png')
    : require('../../../../assets/images/uncheck-white.png');

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image style={styles.icon} source={icon} />
    </TouchableOpacity>
  );
}

export default CheckButton;
