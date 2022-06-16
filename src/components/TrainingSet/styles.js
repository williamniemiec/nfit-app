/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  title: {
    fontSize: 20,
    margin: 5,
    marginLeft: 10,
    color: 'white',
  },
  left: {
    width: '80%',
    justifyContent: 'space-between',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    width: '70%',
    margin: 5,
  },
});
