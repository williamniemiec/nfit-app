import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './Store'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigators/MainNavigator'

const AppContainer = () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  )
}