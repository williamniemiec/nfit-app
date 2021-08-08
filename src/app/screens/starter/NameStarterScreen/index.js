import React, { useLayoutEffect, useRef, useState } from 'react';
import globalStyles from '../../../assets/styles/global';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { translate } from '../../../locales';
import { buildHeaderTabDark } from '../../../components/HeaderTab';
import TheManBackground from '../../../components/background/TheManBackground';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const refName = useRef(name);

  const handleGoNext = () => {
    if (refName.current === '') {
      alert(translate('name_required'));
    }
    else {
      navigation.navigate('ScheduleStarterScreen', {
        name: refName.current
      })
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function changeName(newName) {
    setName(newName);
    refName.current = newName;
  }

  useLayoutEffect(() => {
    navigation.setOptions(buildHeaderTabDark(handleGoBack, handleGoNext));
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
            onChangeText={changeName}
            autoFocus={true}
            autoCapitalize="words"
            onSubmitEditing={handleGoNext}
          />
        </View>
      </SafeAreaView>
    </TheManBackground>
  )
}