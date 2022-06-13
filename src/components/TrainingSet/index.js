import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const TrainingSet = ({title, icons}) => {
  return (
    <View style={styles.left}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal={true} style={styles.icons}>
        { icons != undefined && icons }
      </ScrollView>
    </View>
  );
}

export default TrainingSet;
