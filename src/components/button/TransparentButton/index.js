import React from 'react';
import { Text } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const TransparentButton = ({ title, onPress, fgColor = '#000000' }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={[styles.title, {color: fgColor}]}>
      { title }
    </Text>
  </TouchableOpacity>
);

export default TransparentButton;
