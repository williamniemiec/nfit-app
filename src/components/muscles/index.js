/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import Abs from './Abs'
import Back from './Back'
import Biceps from './Biceps'
import Chest from './Chest'
import Gluteal from './Gluteal'
import Legs from './Legs'
import Shoulders from './Shoulders'
import Triceps from './Triceps'


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
export default {
  abs: <Abs />,
  back: <Back />,
  biceps: <Biceps />,
  chest: <Chest />,
  gluteal: <Gluteal />,
  legs: <Legs />,
  shoulders: <Shoulders />,
  triceps: <Triceps />
}

export const muscleMapping = buildMapping();


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function buildMapping() {
  const mapping = new Map();

  mapping.set('ABS', <Abs />);
  mapping.set('BACK', <Back />);
  mapping.set('BICEPS', <Biceps />);
  mapping.set('CHEST', <Chest />);
  mapping.set('GLUTEAL', <Gluteal />);
  mapping.set('LEGS', <Legs />);
  mapping.set('SHOULDERS', <Shoulders />);
  mapping.set('TRICEPS', <Triceps />);

  return mapping;
}
