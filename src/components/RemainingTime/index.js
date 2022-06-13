import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const RemainingTime = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => computeRemainingTime(setTimeLeft), 
      1000
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <Text>
      {timeLeft}
    </Text>
  );
}

export default RemainingTime;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function computeRemainingTime(setTimeLeft) {
  let diff = getDayRemainingTime();
  let h = Math.floor(diff / (1000 * 60 * 60));
  let m = Math.floor(diff / (1000 * 60) - h * 60);
  let s = Math.floor(diff / 1000 - m * 60 - h * 60 * 60);

  if (h < 10) {
    h = '0' + h;
  }

  if (m < 10) {
    m = '0' + m;
  }

  if (s < 10) {
    s = '0' + s;
  }

  setTimeLeft(`${h}h ${m}min ${s}seg`);
}

function getDayRemainingTime() {
  const now = getCurrentTime();
  const end = getEndDayTime();

  return (end - now);
}

function getCurrentTime() {
  return new Date().getTime();
}

function getEndDayTime() {
  const end = new Date();

  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);
  
  return end.getTime();
}