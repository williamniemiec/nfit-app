import React from 'react'
import { Text, View, KeyboardAvoidingView, Modal } from 'react-native'
import { TouchableHighlight } from 'react-native'
import styles from './styles'

export default function CustomModal(props) {
    const ModalClose = () => {
        return (
            <TouchableHighlight 
                style={styles.modalClose} 
                onPress={props.onClose}
                underlayColor='transparent'
            >
                <Text style={styles.closeText}>X</Text>
            </TouchableHighlight>
        )
    }

    return (
        <Modal
            style={styles.body}
            visible={props.visible}
            transparent={true}
            animationType='fade'
        >
            <KeyboardAvoidingView style={styles.modalBoxArea}>
                <View style={styles.modalBox}>
                    <ModalClose />
                    <View style={styles.modalBody}>
                        {props.children}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}