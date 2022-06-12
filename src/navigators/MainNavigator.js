import React from 'react';
import { useSelector } from 'react-redux';
import HomeNavigator from './HomeNavigator';
import StarterNavigator from './StarterNavigator';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const MainNavigator = () => {
  if (isNewUser()) {
    return <StarterNavigator />;
  }

  return <HomeNavigator />;
}

export default MainNavigator;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isNewUser() {
  const user = useSelector((state) => state.user);

  return ((user.name === '') || (user.name === undefined));
}
