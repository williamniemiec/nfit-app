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
const EditExerciseModal = ({
  modalVisible,
  setModalVisible,
  onSave,
  exercise,
}) => {
  const isNew = (exercise === undefined || exercise === null);
  const [name, setName] = useState(isNew ? '' : exercise.name);
  const [muscle, setMuscle] = useState(isNew ? '' : exercise.muscle);
  const [sets, setSets] = useState(isNew ? '' : exercise.sets);
  const [reps, setReps] = useState(isNew ? '' : exercise.reps);
  const [load, setLoad] = useState(isNew ? '' : exercise.load);

  return (
    <CustomModal
      visible={modalVisible}
      onClose={() => { setModalVisible(false); }}
      style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
    >
      <Text style={styles.modalLabel}>
        { translate('focus_muscle') }
      </Text>
      <MuscleSelector onSelect={setMuscle} />
      <NameSelector name={name} setName={setName} />
      <View style={styles.modalNumericInputs}>
        <SetsSelector sets={sets} setSets={setSets} />
        <RepetitionsSelector repetitions={reps} setRepetitions={setReps} />
        <WeightSelector load={load} setLoad={setLoad} />
      </View>
      <ActionButton
        bgColor={colors.accent}
        title={translate('save')}
        onPress={() => handleModalSave(
          name, 
          setName, 
          muscle, 
          setMuscle, 
          reps, 
          setReps, 
          load, 
          setLoad, 
          sets,
          setSets,
          onSave, 
          setModalVisible
        )}
      />
    </CustomModal>
  );
}

export default EditExerciseModal;

const NameSelector = ({ name, setName }) => (
  <>
    <Text style={styles.modalLabel}>
      { translate('workout_name') }
    </Text>
    <TextInput
      style={styles.modalInput}
      value={name}
      onChangeText={setName}
      placeholder={translate('workout_name')}
    />
  </>
);

const SetsSelector = ({ sets, setSets }) => (
  <View style={styles.modalNumericInput}>
    <Text style={styles.modalLabel}>
      { translate('sets') }
    </Text>
    <TextInput
      style={styles.modalInput}
      keyboardType="numeric"
      value={sets}
      onChangeText={setSets}
      placeholder={translate('workout_sets')}
    />
  </View>
);

const RepetitionsSelector = ({ repetitions, setRepetitions }) => (
  <View style={styles.modalNumericInput}>
    <Text style={styles.modalLabel}>
      { translate('reps') }
    </Text>
    <TextInput
      style={styles.modalInput}
      keyboardType="numeric"
      value={repetitions}
      onChangeText={setRepetitions}
      placeholder={translate('workout_reps')}
    />
  </View>
);

const WeightSelector = ({ load, setLoad }) => (
  <View style={styles.modalNumericInput}>
    <Text style={styles.modalLabel}>
      { translate('weight') }
    </Text>
    <TextInput
      style={styles.modalInput}
      keyboardType="numeric"
      value={load}
      onChangeText={setLoad}
      placeholder={translate('workout_weight')}
    />
  </View>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function handleModalSave(
  name, 
  setName, 
  muscle, 
  setMuscle, 
  reps, 
  setReps, 
  load, 
  setLoad, 
  sets,
  setSets,
  onSave, 
  setModalVisible
) {
  if (!isAllRequiredFieldsFilled(name, muscle, sets, reps, load)) {
    alert(translate('all_fields_required'));
    return;
  }
  
  onSave(name, muscle, sets, reps, load);
  setModalVisible(false);
  resetModal(setName, setMuscle, setSets, setReps, setLoad);
}

function isAllRequiredFieldsFilled(name, muscle, sets, reps, load) {
  return  name != '' 
          && name != undefined
          && muscle != ''
          && muscle != undefined
          && sets != ''
          && sets != undefined
          && reps != ''
          && reps != undefined
          && load != ''
          && load != undefined;
}

function resetModal(setName, setMuscle, setSets, setReps, setLoad) {
  setName('');
  setMuscle('');
  setSets('');
  setReps('');
  setLoad('');
}