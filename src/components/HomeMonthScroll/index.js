/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { translate } from './locales';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const months = [
  translate('january'),
  translate('february'),
  translate('march'),
  translate('april'),
  translate('may'),
  translate('june'),
  translate('july'),
  translate('august'),
  translate('september'),
  translate('october'),
  translate('november'),
  translate('december'),
];


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const HomeMonthScroll = ({
  selectedMonth,
  setSelectedMonth,
  fgColor,
  bgColorActive,
  bgColorInactive,
}) => {
  const monthRef = useRef();
  const [landscape, setLandscape] = useState(isLandscape());
  const [thirdWidth, setThirdWidth] = useState(0);

  useLayoutEffect(() => {
    Dimensions.addEventListener('change', ({ window: {width, height} })=>{
      setLandscape(width > height);
    });
  }, []);

  useLayoutEffect(() => {
    const screen = Math.round(Dimensions.get('window').width);

    setThirdWidth(Math.round(screen / 3));
    setTimeout(() => scrollToMonth(selectedMonth, monthRef, Math.round(screen / 3)), 200);
  }, [landscape]);

  useLayoutEffect(() => {
    setTimeout(() => scrollToMonth(selectedMonth, monthRef, thirdWidth), 200);
  }, [selectedMonth]);

  return (
    <ScrollView
      horizontal={true}
      ref={monthRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={thirdWidth} // Avoids stopping on the middle of screen
      contentContainerStyle={{
        paddingLeft: thirdWidth,
        paddingRight: thirdWidth,
      }}
      onMomentumScrollEnd={(event) => handleScrollEnd(event, setSelectedMonth, thirdWidth)}
      style={styles.area}>
      {months.map((month, index) => (
        <Month
          key={index}
          index={{index}}
          month={month}
          fgColor={fgColor}
          bgColor={(selectedMonth == index) ? bgColorActive : bgColorInactive}
          onPress={() => handleSelectMonth(index, setSelectedMonth)}
          thirdWidth={thirdWidth}
        />
      ))}
    </ScrollView>
  );
};

export default HomeMonthScroll;

const Month = ({ 
  index, 
  month,
  fgColor,
  onPress,
  bgColor,
  thirdWidth
}) => (
  <TouchableOpacity
    onPress={onPress}
    key={index}
    style={[
      styles.monthButton,
      {
        width: thirdWidth - 20,
        backgroundColor: bgColor,
      }
    ]}
  >
    <Text style={[styles.monthLabel, { color: fgColor }]}>
      { month }
    </Text>
  </TouchableOpacity>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isLandscape() {
  const dim = Dimensions.get('screen');
  
  return (dim.width >= dim.height);
}

function handleScrollEnd(event, setSelectedMonth, thirdWidth) {
  const horizontalPosition = event.nativeEvent.contentOffset.x;
  const selectedIndex = Math.round(horizontalPosition / thirdWidth);

  setSelectedMonth(selectedIndex);
}

function scrollToMonth(month, monthRef, thirdWidth) {
  const horizontalPosition = month * thirdWidth;

  monthRef.current.scrollTo({
    x: horizontalPosition,
    y: 0,
    animated: true,
  });
}

function handleSelectMonth(index, setSelectedMonth) {
  setSelectedMonth(index);
}
