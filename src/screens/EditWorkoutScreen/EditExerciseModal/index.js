import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { translate } from '../../../locales';
import colors from '../../../assets/colors';
import CustomModal from '../../../components/CustomModal';
import MuscleSelector from '../../../components/MuscleSelector';
import ActionButton from '../../../components/button/ActionButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export default function EditExerciseModal({
  modalVisible,
  setModalVisible,
  onSave,
  exercise,
}) {
  const isNew = exercise === undefined || exercise === null;

  const [modalId, setModalId] = useState(isNew ? '' : exercise.id);
  const [modalName, setModalName] = useState(isNew ? '' : exercise.name);
  const [modalMuscle, setModalMuscle] = useState(isNew ? '' : exercise.muscle);
  const [modalSets, setModalSets] = useState(isNew ? '' : exercise.sets);
  const [modalReps, setModalReps] = useState(isNew ? '' : exercise.reps);
  const [modalLoad, setModalLoad] = useState(isNew ? '' : exercise.load);

  const resetModal = () => {
    setModalId('');
    setModalName('');
    setModalMuscle('');
    setModalSets('');
    setModalReps('');
    setModalLoad('');
  };

  const handleModalSave = () => {
    if (
      modalName == '' ||
      modalMuscle == '' ||
      modalSets == '' ||
      modalReps == '' ||
      modalLoad == ''
    ) {
      alert(translate('all_fields_required'));
      return;
    }

    onSave();
    setModalVisible(false);
  };

  return (
    <CustomModal
      visible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      style={{backgroundColor: 'rgba(255,255,255,0.8)'}}>
      <Text style={styles.modalLabel}>{translate('focus_muscle')}</Text>

      <MuscleSelector onSelect={setModalMuscle} />

      <Text style={styles.modalLabel}>{translate('workout_name')}</Text>
      <TextInput
        style={styles.modalInput}
        value={modalName}
        onChangeText={setModalName}
        placeholder={translate('workout_name')}
      />

      <View style={styles.modalNumericInputs}>
        <View style={styles.modalNumericInput}>
          <Text style={styles.modalLabel}>{translate('sets')}</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={modalSets}
            onChangeText={setModalSets}
            placeholder={translate('workout_sets')}
          />
        </View>

        <View style={styles.modalNumericInput}>
          <Text style={styles.modalLabel}>{translate('reps')}</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={modalReps}
            onChangeText={setModalReps}
            placeholder={translate('workout_reps')}
          />
        </View>

        <View style={styles.modalNumericInput}>
          <Text style={styles.modalLabel}>{translate('weight')}</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={modalLoad}
            onChangeText={setModalLoad}
            placeholder={translate('workout_weight')}
          />
        </View>
      </View>
      <ActionButton
        bgColor={colors.accent}
        title={translate('save')}
        onPress={handleModalSave}
      />
    </CustomModal>
  );
}

//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
