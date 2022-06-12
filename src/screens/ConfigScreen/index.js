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


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConfigScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          <NameSelector dispatch={dispatch} user={user} />
          <DaysSelector dispatch={dispatch} user={user} />
          <LevelSelector dispatch={dispatch} user={user} />
          <ResetButton dispatch={dispatch} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ConfigScreen;

const NameSelector = ({ user, dispatch }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('question_name') }
    </Text>
    <TextInput
      style={styles.input}
      placeholder={translate('name')}
      value={user.name}
      onChangeText={(name) => updateName(name, dispatch)}
    />
  </View>
);

const DaysSelector = ({ user, dispatch }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('question_week_days') }
    </Text>
    <WeekdaySelector
      reduced={true}
      onPress={(day) => handleChangeWorkoutDay(day, dispatch, user)}
      selectedOps={user.workoutDays}
      bgColor={colors.accent}
      fgColor={colors.textPrimary}
    />
  </View>
);

const LevelSelector = ({ user, dispatch }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('question_level') }
    </Text>
    <WorkoutLevel
      onPress={(level) => handleChangeLevels(level, dispatch)}
      selected={user.level}
      bgColor={colors.accent}
      fgColor={colors.textPrimary}
      full={true}
    />
  </View>
);

const ResetButton = ({ dispatch }) => (
  <View style={styles.formControl}>
    <Text>
      { translate('clean_all_confirmation') }
    </Text>
    <TransparentButton
      title={translate('clean_all')}
      onPress={() => handleReset(dispatch)}
    />
  </View>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleChangeWorkoutDay(day, dispatch, user) {
  const alreadySelected = user.workoutDays.includes(day);
  const type = alreadySelected ? 'DEL_WORKOUT_DAY' : 'ADD_WORKOUT_DAY';

  dispatch({
    type: type,
    payload: {
      workoutDay: day,
    }
  });
}

function handleChangeLevels(level, dispatch) {
  dispatch({
    type: 'SET_LEVEL',
    payload: {
      level: level,
    }
  });
}

function updateName(name, dispatch) {
  dispatch({
    type: 'SET_NAME',
    payload: {
      name: name,
    }
  });
}

function handleGoBack(navigation) {
  navigation.goBack();
}

function handleReset(dispatch) {
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
        onPress: () => reset(dispatch),
      },
    ],
    { cancelable: false }
  );
}

function reset(dispatch) {
  dispatch({type: 'RESET'});
  RNRestart.Restart();
}