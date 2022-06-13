import React, { useRef, useLayoutEffect } from 'react';
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
const screenWidth = Math.round(Dimensions.get('window').width);
const thirdWidth = screenWidth / 3;


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

  useLayoutEffect(() => {
    setTimeout(() => scrollToMonth(selectedMonth, monthRef), 100);
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
      onMomentumScrollEnd={(event) => handleScrollEnd(event, setSelectedMonth)}
      style={styles.area}>
      {months.map((month, index) => (
        <Month
          index={{index}}
          month={month}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          bgColorActive={bgColorActive}
          bgColorInactive={bgColorInactive}
          fgColor={fgColor}
        />
      ))}
    </ScrollView>
  );
};

export default HomeMonthScroll;

const Month = ({ 
  index, 
  month,
  selectedMonth, 
  setSelectedMonth, 
  bgColorActive, 
  bgColorInactive,
  fgColor
}) => (
  <TouchableOpacity
    onPress={() => handleSelectMonth(index, setSelectedMonth)}
    key={index}
    style={[
      styles.monthButton,
      {
        width: thirdWidth - 20,
        backgroundColor:
          selectedMonth == index ? bgColorActive : bgColorInactive,
      },
    ]}>
    <Text style={[styles.monthLabel, { color: fgColor }]}>
      { month }
    </Text>
  </TouchableOpacity>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleScrollEnd(event, setSelectedMonth) {
  const horizontalPosition = event.nativeEvent.contentOffset.x;
  const selectedIndex = Math.round(horizontalPosition / thirdWidth);

  setSelectedMonth(selectedIndex);
}

function scrollToMonth(month, monthRef) {
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
