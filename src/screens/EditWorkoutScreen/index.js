import React, { useState, useLayoutEffect } from 'react'
import { View, SafeAreaView, TextInput, FlatList } from 'react-native'
import styles from './styles'
import globalStyles from '../../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import SaveButton from '../../components/button/small/SaveButton'
import ActionButton from '../../components/button/ActionButton'
import TransparentButton from '../../components/button/TransparentButton'
import ExercisesItemEdit from '../../components/ExercisesItemEdit'
import EditExerciseModal from './EditExerciseModal'
import 'react-native-get-random-values'
import {v4 as uuid} from 'uuid'
import { translate } from '../../locales';
import colors from '../../assets/colors';
import { buildHeaderTabAccent } from '../../components/HeaderTab';

export default (props) => {
    const isNew = (props.route.params === undefined)
    let workout = []

    if (!isNew) {
        workout = props.route.params.workout
    }

    const [id, setId] = useState(isNew ? uuid() : workout.id)
    const [name, setName] = useState(isNew ? '' : workout.name)
    const [exercises, setExercises] = useState(isNew ? [] : (workout.exercises === undefined) ? [] : workout.exercises)
    const [editExercise, setEditExercise] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    
    
    const navigation = useNavigation()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    

    function handleGoBack() {
        navigation.goBack()
    }

    const handleSave = () => {
        if (name == '') {
            alert(translate('workout_name_required'))
            return
        }

        if (isNew) {
            dispatch({
                type:'ADD_MY_WORKOUTS',
                payload:{
                    id:id,
                    name:name,
                    exercises:exercises
                }
            })
        }
       else {
            dispatch({
                type:'UPDATE_MY_WORKOUTS',
                payload:{
                    id:id,
                    name:name,
                    exercises:exercises
                }
            })
        }
        navigation.goBack()
    }

    const handleModalSave = (modalId, modalName, modalMuscle, modalSets, modalReps, modalLoad) => {
        if (isNew) {
            exercises.push({
                id:uuid(),
                name:modalName,
                muscle:modalMuscle,
                sets:modalSets,
                reps:modalReps,
                load:modalLoad
            })
        }
        else {
            const index = exercises.findIndex(e => e.id == modalId)
            if (index > -1) {
                exercises[index].name = modalName
                exercises[index].muscle = modalMuscle
                exercises[index].sets = modalSets
                exercises[index].reps = modalReps
                exercises[index].load = modalLoad
            }
            else { // lista de exerc estava vazia
                exercises.push({
                    id:uuid(),
                    name:modalName,
                    muscle:modalMuscle,
                    sets:modalSets,
                    reps:modalReps,
                    load:modalLoad
                })
            }
        }

        setExercises(exercises)
    }

    useLayoutEffect(()=> {
        navigation.setOptions((buildHeaderTabAccent(
            <TransparentButton title={`< ${translate('back')}`} onPress={handleGoBack} fgColor={colors.textPrimary} />, 
            <SaveButton onPress={handleSave} />,
            isNew ? translate('add_workout') : translate('edit_workout')
        )));
    },[name])

    const handleAddExercise = () => {
        setEditExercise(null)
        setModalVisible(true)
    }    

    const removeExercise = (exercise) => {
        const newExercises = exercises.filter(ex => ex.id != exercise.id)

        setExercises(newExercises)
    }

    const handleEditExercise = (exercise) => {
        setEditExercise(exercise)
        setModalVisible(true)
    }

    return (
        <SafeAreaView style={[globalStyles.container, styles.body]}>
            <EditExerciseModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onSave={handleModalSave}
                exercise={editExercise}
            />
            
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={translate('name')}
            />
            <View style={styles.exercisesArea}>
                <ActionButton bgColor={colors.accent} title={translate('add_workout')} onPress={handleAddExercise} />
                <FlatList 
                    style={styles.exercisesList}
                    data={exercises}
                    renderItem={({item}) => (
                        <ExercisesItemEdit 
                            data={item} 
                            editExercise={() => handleEditExercise(item)}
                            removeExercise={() => removeExercise(item)}
                        />
                    )}
                    keyExtractor={item => item.name}
                />
            </View>
        </SafeAreaView>
    )
}