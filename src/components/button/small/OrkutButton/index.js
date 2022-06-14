import React from 'react';
import { TouchableHighlight } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const OrkutButton = ({onPress, selected, color}) => {
  const colorTheme = (color === undefined) ? '#ed238e' : color;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={[
        styles.circleBtn,
        {
          borderColor: colorTheme,
          backgroundColor: selected ? colorTheme : null,
        },
      ]}>
      <></>
    </TouchableHighlight>
  );
}

export default OrkutButton;
