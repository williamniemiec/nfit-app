/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  body: {
    alignItems: 'center',
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    width: '100%',
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 6,
  },
  exercisesArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
    flex: 1,
  },
  exercisesList: {
    flex: 1,
    paddingTop: 20,
  },
  modalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalInput: {
    width: '90%',
    fontSize: 14,
    color: '#333',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalNumericInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalNumericInput: {
    flex: 1,
  }
});
