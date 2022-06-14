import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import HomeStackNavigator from '../HomeStackNavigator';
import DoTrainingNavigator from '../DoTrainingNavigator';
import MyTrainingNavigator from '../MyTrainingNavigator';
import CustomTabBar from '../../components/CustomTabBar';
import StarterNavigator from '../StarterNavigator';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  const user = useSelector((state) => state.user);

  return (
    <AppNavigator user={user} />
  );
};

export default HomeNavigator;

const AppNavigator = ({ user }) => {
  if (isNewUser(user)) {
    return <StarterNavigator />;
  } 

  return (
    <Tab.Navigator
      tabBar={(tabProps) => <CustomTabBar { ...tabProps } />}
      tabBarOptions={{keyboardHidesTabBar: true}}
      initialRouteName="HomeNavigator"
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          type: 'regular',
          icon: require('../../assets/images/home.png'),
        }}
      />
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
      <Tab.Screen
        name="MyTrainingNavigator"
        component={MyTrainingNavigator}
        options={{
          title: 'My Training',
          type: 'regular',
          icon: require('../../assets/images/myworkouts.png'),
        }}
      />
    </Tab.Navigator>
  );
}


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isNewUser(user) {
  return (user.name === '') || (user.name === undefined);
}
