/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5810c',
    width: '100%',
    borderRadius: 10,
    height: 40,
  },
});
