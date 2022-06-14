import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const EditButton = ({ onPress }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Image 
      style={styles.icon} 
      source={require('../../../../assets/images/edit-white.png')} 
    />
  </TouchableOpacity>
);

export default EditButton;
