import React, { useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import globalStyles from '../../../assets/styles/global';
import { translate } from '../../../locales';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import TheManBackground from '../../../components/background/TheManBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const NameStarterScreen = () => {
  
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const refName = useRef(name);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabDark(
        () => handleGoBack(navigation), 
        () => handleGoNext(navigation, refName)
      )
    );
  }, []);

  return (
    <TheManBackground>
      <SafeAreaView style={[globalStyles.container, globalStyles.panel]}>
        <View style={[styles.area]}>
          <Text style={globalStyles.title}>{translate('question_name')}</Text>
          <TextInput
            style={styles.input}
            placeholder={translate('name')}
            placeholderTextColor='white'
            onChangeText={(text) => changeName(text, refName, setName)}
            autoFocus={true}
            autoCapitalize="words"
            onSubmitEditing={() => handleGoNext(navigation, refName)}
          />
        </View>
      </SafeAreaView>
    </TheManBackground>
  )
}

export default NameStarterScreen;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleGoNext(navigation, refName) {
  if (refName.current === '') {
    alert(translate('name_required'));
  }
  else {
    navigation.navigate('ScheduleStarterScreen', {
      name: refName.current
    })
  }
}

function handleGoBack(navigation) {
  navigation.goBack();
}

function changeName(newName, refName, setName) {
  setName(newName);
  refName.current = newName;
}