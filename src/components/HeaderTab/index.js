import React from 'react';
import styles from './styles';
import TransparentButton from '../button/TransparentButton';
import {translate} from '../../locales';
import colors from '../../assets/colors';

//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export function buildHeaderTabDark(
  handleGoBack,
  handleGoNext,
  bgColor = 'black',
  fgColor = 'white',
  title = '',
) {
  const headerRightComponent = handleGoNext ? (
    <TransparentButton
      title={`${translate('next')} >`}
      onPress={handleGoNext}
      fgColor="white"
    />
  ) : null;
  const headerLeftComponent = handleGoBack ? (
    <TransparentButton
      title={`< ${translate('back')}`}
      onPress={handleGoBack}
      fgColor="white"
    />
  ) : null;

  return buildHeaderTab(
    headerLeftComponent,
    headerRightComponent,
    title,
    bgColor,
    fgColor,
  );
}

export function buildHeaderTabAccent(
  headerLeftComponent,
  headerRightComponent,
  title = '',
) {
  return buildHeaderTab(
    headerLeftComponent,
    headerRightComponent,
    title,
    colors.accent,
    colors.textPrimary,
  );
}

function buildHeaderTab(
  headerLeftComponent,
  headerRightComponent,
  title = '',
  bgColor = 'black',
  fgColor = 'white',
) {
  return {
    headerShown: true,
    title: title,
    headerTitleAlign: 'center',
    headerTintColor: fgColor,
    headerRight: () => headerRightComponent,
    headerLeft: () => headerLeftComponent,
    headerStyle: {backgroundColor: bgColor},
    headerLeftContainerStyle: styles.headerLeft,
    headerRightContainerStyle: styles.headerRight,
  };
}
