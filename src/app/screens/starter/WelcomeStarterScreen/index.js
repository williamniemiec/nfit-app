import React from 'react';
import globalStyles from '../../../assets/styles/global';
import styles from './styles';
import { SafeAreaView, Text, Image } from 'react-native';
import ActionButton from '../../../components/button/ActionButton';
import TheManBackground from '../../../components/background/TheManBackground';
import { useNavigation } from '@react-navigation/native';
import { translate } from '../../../locales';

export default function WelcomeScreen() {
  const navigation = useNavigation()
  
  function handleBegin() {
    navigation.navigate('NameStarterScreen')
  }

  return (
    <TheManBackground>
      <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
        <Text style={globalStyles.title}>{translate('welcome_title')}</Text>
        <Image style={styles.centralImage} source={require('../../../assets/images/icon.png')} />
        <ActionButton title={translate('welcome_start')} onPress={handleBegin} />
      </SafeAreaView>
    </TheManBackground>
  )
}