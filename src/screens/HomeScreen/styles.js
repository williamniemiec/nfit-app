/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  legendArea: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 30,
    paddingLeft: 10,
  },
  legendText: {
    color: '#555',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  legendBox: {
    width: 15,
    height: 15,
    backgroundColor: '#ccc',
    marginRight: 5
  },
});
