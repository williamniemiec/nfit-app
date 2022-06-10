import React, { useLayoutEffect } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, Alert, ScrollView } from 'react-native'
import styles from './styles'
import globalStyles from '../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import ConfigButton from '../../components/button/small/ConfigButton'
import { TextInput } from 'react-native'
import TransparentButton from '../../components/button/TransparentButton'
import WeekdaySelector from '@wniemiec-component-reactnative/weekday-selector'
import WorkoutLevel from '../../components/WorkoutLevel'
import { Header, useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import RNRestart from 'react-native-restart'
import { translate } from '../../locales';
import { buildHeaderTabAccent } from '../../components/HeaderTab';
import colors from '../../resources/colors';

export default function ConfigScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  console.log(user)

  function handleGoBack() {
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions(buildHeaderTabAccent(<TransparentButton title={`< ${translate('back')}`} onPress={handleGoBack} fgColor={colors.textPrimary} />, null, translate('configurations')));
  }, [])

  function handleReset() {
    Alert.alert(
      translate('remove_workout'),
      translate('remove_workout_confirmation'),
      [
        {
          text: translate('no'),
          onPress: null
        },
        {
          text: translate('yes'),
          onPress: reset
        }
      ],
      { cancelable: false }
    )
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
    RNRestart.Restart()
  }

  function handleChangeWorkoutDay(day) {
    const alreadySelected = user.workoutDays.includes(day)
    const type = alreadySelected ? 'DEL_WORKOUT_DAY' : 'ADD_WORKOUT_DAY'

    dispatch({
      type: type,
      payload: {
        workoutDay: day
      }
    })
  }

  function handleChangeLevels(level) {
    dispatch({
      type: 'SET_LEVEL',
      payload: {
        level: level
      }
    })
  }

  const updateName = (name) => {
    dispatch({
      type: 'SET_NAME',
      payload: {
        name: name
      }
    })
  }

  return (
    <SafeAreaView style={[globalStyles.container, styles.area]}>
      <ScrollView style={globalStyles.container}>
        <KeyboardAvoidingView style={globalStyles.container}>
          <View style={styles.formControl}>
            <Text>{translate('question_name')}</Text>
            <TextInput
              style={styles.input}
              placeholder={translate('name')}
              value={user.name}
              onChangeText={updateName}
            />
          </View>
          <View style={styles.formControl}>
            <Text>{translate('question_week_days')}</Text>
            <WeekdaySelector reduced={true} onPress={handleChangeWorkoutDay} selectedOps={user.workoutDays} bgColor={colors.accent} fgColor={colors.textPrimary} />
          </View>
          <View style={styles.formControl}>
            <Text>{translate('question_level')}</Text>
            <WorkoutLevel onPress={handleChangeLevels} selected={user.level} bgColor={colors.accent} fgColor={colors.textPrimary} full={true} />
          </View>
          <View style={styles.formControl}>
            <Text>{translate('clean_all_confirmation')}</Text>
            <TransparentButton title={translate('clean_all')} onPress={handleReset} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}