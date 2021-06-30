import React, { useState } from 'react'
import { Image, View, SafeAreaView, Text, TextInput, FlatList, ScrollView } from 'react-native'
import styles from './styles'
import globalStyles from '../../../assets/styles/global'
import CustomModal from '../../../components/CustomModal'
import MuscleSelector from '../../../components/MuscleSelector'
import ActionButton from '../../../components/button/ActionButton'

export default function EditExerciseModal({modalVisible, setModalVisible, onSave, exercise}) {
    const isNew = (exercise === undefined || exercise === null)

    const [modalId, setModalId] = useState(isNew ? '' : exercise.id)
    const [modalName, setModalName] = useState(isNew ? '' : exercise.name)
    const [modalMuscle, setModalMuscle] = useState(isNew ? '' : exercise.muscle)
    const [modalSets, setModalSets] = useState(isNew ? '' : exercise.sets)
    const [modalReps, setModalReps] = useState(isNew ? '' : exercise.reps)
    const [modalLoad, setModalLoad] = useState(isNew ? '' : exercise.load)

    

    const resetModal = () => {
        setModalId('')
        setModalName('')
        setModalMuscle('')
        setModalSets('')
        setModalReps('')
        setModalLoad('')
    }

    const handleModalSave = () => {
        if (modalName == '' || modalMuscle == '' || modalSets == '' || modalReps == '' || modalLoad == '') {
            alert('Preencha todos os campos!')
            return
        }

        onSave()
        setModalVisible(false)
    }

    

    /*
    if (isNew) {
        resetModal()
    }
    else {
        //editExercise(exercise)
    }
*/
    return (
        <CustomModal
            visible={modalVisible}
            onClose={() => {setModalVisible(false)}}
        >
            <Text style={styles.modalLabel}>Músculo de foco</Text>

            <MuscleSelector onSelect={setModalMuscle} />

            <Text style={styles.modalLabel}>Nome do exercício</Text>
            <TextInput 
                style={styles.modalInput}
                value={modalName}
                onChangeText={setModalName}
                placeholder='Digite o nome do treino'
            />

            <View style={styles.modalNumericInputs}>
                <View style={styles.modalNumericInput}>
                    <Text style={styles.modalLabel}>Séries</Text>
                    <TextInput
                        style={styles.modalInput}
                        keyboardType='numeric'
                        value={modalSets}
                        onChangeText={setModalSets}
                        placeholder='Digite as séries do treino'
                    />
                </View>

                <View style={styles.modalNumericInput}>
                    <Text style={styles.modalLabel}>Repetições</Text>
                    <TextInput
                        style={styles.modalInput}
                        keyboardType='numeric'
                        value={modalReps}
                        onChangeText={setModalReps}
                        placeholder='Digite as repetições do treino'
                    />
                </View>

                <View style={styles.modalNumericInput}>
                    <Text style={styles.modalLabel}>Carga</Text>
                    <TextInput
                        style={styles.modalInput}
                        keyboardType='numeric'
                        value={modalLoad}
                        onChangeText={setModalLoad}
                        placeholder='Digite a carga do treino'
                    />
                </View>
            </View>
            <ActionButton bgColor='#4ac34e' title='Salvar' onPress={handleModalSave} />
        </CustomModal>
    )
}