/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  btnTitle: {
    fontSize: 15,
    color: 'black',
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    minWidth: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    height: 40,
    margin: 5,
  },
  selected: {
    backgroundColor: '#00bb00',
    color: 'white',
  },
});
