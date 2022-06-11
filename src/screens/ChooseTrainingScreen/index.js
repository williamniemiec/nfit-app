import React, { useLayoutEffect } from 'react';
import { ScrollView, View, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import globalStyles from '../../assets/styles/global';
import colors from '../../assets/colors';
import { translate } from '../../locales';
import Workout from '../../components/Workout';
import PlayButton from '../../components/button/small/PlayButton';
import TransparentButton from '../../components/button/TransparentButton';
import { buildHeaderTabAccent } from '../../components/HeaderTab';
import GymEquipmentBackground from '../../components/background/GymEquipmentBackground';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function TrainingScreen() {
  const navigation = useNavigation();
  const user = useSelector((s) => s.user);

  function handleGoBack() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'HomeNavigator',
          },
        ],
      }),
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabAccent(
        <TransparentButton
          title={`< ${translate('back')}`}
          onPress={handleGoBack}
          fgColor={colors.textPrimary}
        />,
        null,
        translate('choose_workout'),
      ),
    );
  }, []);

  const goWorkout = (workout) => {
    navigation.navigate('PlayTrainingScreen', {workout});
  };

  const LastWorkout = () => {
    if (!user.lastWorkout) return <View></View>;

    const lastWorkout = user.myWorkouts.find((w) => w.id == user.lastWorkout);

    return (
      <View>
        <Text style={globalStyles.message}>{translate('last_workout')}:</Text>
        <View style={styles.area}>
          <Workout
            id={lastWorkout.id}
            name={lastWorkout.name}
            exercises={lastWorkout.exercises}
          />
        </View>
      </View>
    );
  };

  const RemainingWorkouts = () => (
    <ScrollView style={[globalStyles.container, styles.body]}>
      {user.myWorkouts.map(
        (workout, index) =>
          workout.id != user.lastWorkout && (
            <View style={styles.area} key={index}>
              <Workout
                id={workout.id}
                name={workout.name}
                exercises={workout.exercises}
              />
              <PlayButton onPress={() => goWorkout(workout)} />
            </View>
          ),
      )}
    </ScrollView>
  );

  return (
    <GymEquipmentBackground>
      <SafeAreaView style={[globalStyles.container, styles.body]}>
        <LastWorkout />
        <RemainingWorkouts />
      </SafeAreaView>
    </GymEquipmentBackground>
  );
}

//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
