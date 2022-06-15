import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ActionButton = ({ title, onPress, bgColor, style }) => {
  const bgStyle = (bgColor === undefined) ? null : { backgroundColor: bgColor };

  return (
    <TouchableOpacity style={[styles.btn, bgStyle, style]} onPress={onPress}>
      <Text style={styles.title}>
        { title }
      </Text>
    </TouchableOpacity>
  );
}

export default ActionButton;
