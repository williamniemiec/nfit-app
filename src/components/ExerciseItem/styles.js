/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  area: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exercise: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
  },
  exerciseName: {
    fontSize: 15,
    color: 'white',
  },
  exerciseDetails: {
    fontSize: 12,
    color: 'white',
  },
  index: {
    color: 'white',
    fontSize: 15,
  },
});
