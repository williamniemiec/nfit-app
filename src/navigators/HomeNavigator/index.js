import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import HomeStackNavigator from '../HomeStackNavigator';
import DoTrainingNavigator from '../DoTrainingNavigator';
import MyTrainingNavigator from '../MyTrainingNavigator';
import MainNavigator from '../MainNavigator';
import CustomTabBar from '../../components/CustomTabBar';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

const HomeNavigator = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!isNameParamSet(props)) {
      return;
    }

    dispatch({
      type: 'SET_NAME',
      payload: {
        name: props.route.params.name,
      },
    });
    dispatch({
      type: 'SET_LEVEL',
      payload: {
        level: props.route.params.level,
      },
    });
    dispatch({
      type: 'SET_WORKOUT_DAYS',
      payload: {
        workoutDays: props.route.params.workoutDays,
      },
    });
    dispatch({
      type: 'SET_MY_WORKOUTS',
      payload: {
        workouts: props.route.params.workout,
      },
    });
  }, [props]);

  return (
    <AppNavigator user={user} />
  );
};

export default HomeNavigator;

const AppNavigator = ({ user }) => {
  if (isNewUser(user)) {
    return <MainNavigator />;
  } 

  return (
    <Tab.Navigator
      tabBar={(tabProps) => <CustomTabBar { ...tabProps } />}
      tabBarOptions={{keyboardHidesTabBar: true}}
      initialRouteName="HomeNavigator"
    >
      <HomeButton />
      <PlayButton />
      <MyTrainingButton />
    </Tab.Navigator>
  );
}

const HomeButton = () => (
  <Tab.Screen
    name="HomeNavigator"
    component={HomeStackNavigator}
    options={{
      title: 'Home',
      type: 'regular',
      icon: require('../../assets/images/home.png'),
    }}
  />
);

const PlayButton = () => (
  <Tab.Screen
    name="DoTrainingNavigator"
    component={DoTrainingNavigator}
    options={{
      title: 'Play',
      type: 'big',
      icon: require('../../assets/images/dumbbell.png'),
      tabBarVisible: false,
    }}
  />
);

const MyTrainingButton = () => (
  <Tab.Screen
    name="MyTrainingNavigator"
    component={MyTrainingNavigator}
    options={{
      title: 'My Training',
      type: 'regular',
      icon: require('../../assets/images/myworkouts.png'),
    }}
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isNameParamSet(props) {
  return  (props.route != undefined) 
          || (props.route.params.name != undefined);
}

function isNewUser(user) {
  return (user.name === '') || (user.name === undefined);
}
