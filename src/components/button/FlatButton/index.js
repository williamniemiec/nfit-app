import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const FlatButton = ({ title, onPress, selected }) => (
  <TouchableHighlight
    underlayColor={selected ? 'transparent' : '#aaa'}
    style={[styles.btnArea, selected ? styles.selected : null]}
    onPress={onPress}>
    <Text style={[styles.btnTitle, selected ? styles.selected : null]}>
      {title}
    </Text>
  </TouchableHighlight>
);

export default FlatButton;