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
const ChooseTrainingScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((s) => s.user);

  useLayoutEffect(() => {
    navigation.setOptions(
      buildHeaderTabAccent(
        <TransparentButton
          title={`< ${translate('back')}`}
          onPress={() => handleGoBack(navigation)}
          fgColor={colors.textPrimary}
        />,
        null,
        translate('choose_workout')
      )
    );
  }, []);

  return (
    <GymEquipmentBackground>
      <SafeAreaView style={[globalStyles.container, styles.body]}>
        <LastWorkout user={user} />
        <RemainingWorkouts user={user} navigation={navigation} />
      </SafeAreaView>
    </GymEquipmentBackground>
  );
}

export default ChooseTrainingScreen;

const LastWorkout = ({ user }) => {
  if (!user.lastWorkout) {
    return <View></View>;
  }

  const workout = user.myWorkouts.find((w) => w.id == user.lastWorkout);

  return (
    <View>
      <Text style={globalStyles.message}>
        { translate('last_workout') }:
      </Text>
      <View style={styles.area}>
        <Workout
          id={workout.id}
          name={workout.name}
          exercises={workout.exercises}
        />
      </View>
    </View>
  );
}

const RemainingWorkouts = ({ user, navigation }) => (
  <ScrollView style={[globalStyles.container, styles.body]}>
    {user.myWorkouts.map((workout, index) =>
        workout && workout.id != user.lastWorkout && (
          <View style={styles.area} key={index}>
            <Workout
              id={workout.id}
              name={workout.name}
              exercises={workout.exercises}
            />
            <PlayButton onPress={() => goWorkout(workout, navigation)} />
          </View>
        ),
    )}
  </ScrollView>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleGoBack(navigation) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'HomeNavigator',
        }
      ]
    })
  );
}

function goWorkout(workout, navigation) {
  navigation.navigate('PlayTrainingScreen', { workout });
}
