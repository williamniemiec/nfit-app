import React, {useState} from 'react';
import {
  Image,
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function MuscleSelector({onSelect}) {
  const [selected, setSelected] = useState('abs');

  const handleSelect = (muscle) => {
    setSelected(muscle);
    onSelect(muscle);
  };

  const Muscle = (props) => {
    const OPACITY_SELECTED = 1;
    const OPACITY_UNSELECTED = 0.3;

    return (
      <TouchableHighlight
        style={[
          styles.modalMuscle,
          {
            opacity:
              selected == props.name ? OPACITY_SELECTED : OPACITY_UNSELECTED,
          },
        ]}
        onPress={() => handleSelect(props.name)}
        underlayColor="gray">
        <Image style={styles.modalMuscleImage} source={props.img} />
      </TouchableHighlight>
    );
  };

  return (
    <ScrollView
      style={styles.modalMuscles}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <Muscle
        name={'abs'}
        img={require('../../assets/images/muscles/abs.png')}
      />
      <Muscle
        name={'back'}
        img={require('../../assets/images/muscles/back.png')}
      />
      <Muscle
        name={'biceps'}
        img={require('../../assets/images/muscles/biceps.png')}
      />
      <Muscle
        name={'chest'}
        img={require('../../assets/images/muscles/chest.png')}
      />
      <Muscle
        name={'gluteos'}
        img={require('../../assets/images/muscles/gluteos.png')}
      />
      <Muscle
        name={'legs'}
        img={require('../../assets/images/muscles/legs.png')}
      />
      <Muscle
        name={'shoulders'}
        img={require('../../assets/images/muscles/shoulders.png')}
      />
      <Muscle
        name={'triceps'}
        img={require('../../assets/images/muscles/triceps.png')}
      />
    </ScrollView>
  );
}
