import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import RNRestart from 'react-native-restart';
import WeekdaySelector from '@wniemiec-component-reactnative/weekday-selector';
import styles from './styles';
import globalStyles from '../../assets/styles/global';
import colors from '../../assets/colors';
import { translate } from '../../locales';
import TransparentButton from '../../components/button/TransparentButton';
import WorkoutLevel from '../../components/WorkoutLevel';
import { buildHeaderTabAccent } from '../../components/HeaderTab';
import LocalStorageService from '../../services/LocalStorageService';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConfigScreen = () => {
  const navigation = useNavigation();
  const localStorageService = new LocalStorageService(useDispatch());
  const user = useSelector((state) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabAccent(
        <TransparentButton
          title={`< ${translate('back')}`}
          onPress={() => handleGoBack(navigation)}
          fgColor={colors.textPrimary}
        />,
        null,
        translate('configurations'),
      )
    );
  }, []);

  return (
    <SafeAreaView style={[globalStyles.container, styles.area]}>
      <ScrollView style={globalStyles.container}>
        <KeyboardAvoidingView style={globalStyles.container}>
          <NameSelector localStorageService={localStorageService} user={user} />
          <DaysSelector localStorageService={localStorageService} user={user} />
          <LevelSelector localStorageService={localStorageService} user={user} />
          <ResetButton localStorageService={localStorageService} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ConfigScreen;

const NameSelector = ({ user, localStorageService }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('question_name') }
    </Text>
    <TextInput
      style={styles.input}
      placeholder={translate('name')}
      value={user.name}
      onChangeText={(name) => updateName(name, localStorageService)}
    />
  </View>
);

const DaysSelector = ({ user, localStorageService }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('question_week_days') }
    </Text>
    <WeekdaySelector
      reduced={true}
      onPress={(day) => handleChangeWorkoutDay(day, localStorageService, user)}
      selectedOps={user.workoutDays}
      bgColor={colors.accent}
      fgColor={colors.textPrimary}
    />
  </View>
);

const LevelSelector = ({ user, localStorageService }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('question_level') }
    </Text>
    <WorkoutLevel
      onPress={(level) => handleChangeLevels(level, localStorageService)}
      selected={user.level}
      bgColor={colors.accent}
      fgColor={colors.textPrimary}
      full={true}
    />
  </View>
);

const ResetButton = ({ localStorageService }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('clean_all_confirmation') }
    </Text>
    <TransparentButton
      title={translate('clean_all')}
      onPress={() => handleReset(localStorageService)}
    />
  </View>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleChangeWorkoutDay(day, localStorageService, user) {
  const alreadySelected = user.workoutDays.includes(day);

  if (alreadySelected) {
    localStorageService.removeWorkoutDay(day);
  }
  else {
    localStorageService.addWorkoutDay(day);
  }
}

function handleChangeLevels(level, localStorageService) {
  localStorageService.setLevel(level);
}

function updateName(name, localStorageService) {
  localStorageService.setName(name);
}

function handleGoBack(navigation) {
  navigation.goBack();
}

function handleReset(localStorageService) {
  Alert.alert(
    translate('remove_workout'),
    translate('remove_workout_confirmation'),
    [
      {
        text: translate('no'),
        onPress: null,
      },
      {
        text: translate('yes'),
        onPress: () => reset(localStorageService),
      },
    ],
    { cancelable: false }
  );
}

function reset(localStorageService) {
  localStorageService.reset();
  RNRestart.Restart();
}