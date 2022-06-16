/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { 
  Text, 
  View, 
  KeyboardAvoidingView, 
  Modal,
  TouchableHighlight
} from 'react-native';
import styles from './styles';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const CustomModal = (props) => (
  <Modal
    style={styles.body}
    visible={props.visible}
    transparent={true}
    animationType="fade"
  >
    <KeyboardAvoidingView style={styles.modalBoxArea}>
      <View style={[styles.modalBox, props.style]}>
        <ModalClose onClose={props.onClose} />
        <View>
          { props.children }
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default CustomModal;

const ModalClose = ({ onClose }) => {
  return (
    <TouchableHighlight
      style={styles.modalClose}
      onPress={onClose}
      underlayColor="transparent"
    >
      <Text style={styles.closeText}>
        X
      </Text>
    </TouchableHighlight>
  );
};
