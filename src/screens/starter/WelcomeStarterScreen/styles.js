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
    fontSize: 20,
  },
  centralImage: {
    width: 250,
    height: 250,
    flex: 1,
    resizeMode: 'contain',
  },
  actionBtn: {
    flex: 1,
  },
});
