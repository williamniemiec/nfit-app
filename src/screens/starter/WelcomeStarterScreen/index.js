import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import globalStyles from '../../../assets/styles/global';
import { translate } from '../../../locales';
import ActionButton from '../../../components/button/ActionButton';
import TheManBackground from '../../../components/background/TheManBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const WelcomeStarterScreen = () => {
  const navigation = useNavigation();

  return (
    <TheManBackground>
      <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
        <Header />
        <Logo />
        <ActionButton 
          title={translate('welcome_start')} 
          onPress={() => handleBegin(navigation)} 
        />
      </SafeAreaView>
    </TheManBackground>
  );
}

export default WelcomeStarterScreen;

const Header = () => (
  <Text style={globalStyles.title}>
    {translate('welcome_title')}
  </Text>
);

const Logo = () => (
  <Image 
    style={styles.centralImage} 
    source={require('../../../assets/images/icon.png')} 
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleBegin(navigation) {
  navigation.navigate('NameStarterScreen');
}
