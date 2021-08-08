import React, { useState } from 'react'
import { View, Text } from "react-native";
import styles from './styles'
import Muscles from '../muscles'
import CheckButton from '../button/small/CheckButton';
import { translate } from '../../locales';

export default function ExerciseItem({data, index, onCheck}) {
    const [done, setDone] = useState(false)
    
    const handleCheckExercise = () => {
        setDone(!done)
        onCheck()
    }

    return (
        <View style={styles.area}>
            <View style={styles.exercise}>
                <Text style={styles.index}>{index}. </Text>
                {Muscles[data.muscle]}
                <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{data.name}</Text>
                    <Text style={styles.exerciseDetails}>
                        {`${data.sets} ${translate('workout_detail_sets')} - ${data.reps} ${translate('workout_detail_reps')} ${data.load ? `- ${data.load} ${translate('workout_detail_weight')}`:``}`}
                    </Text>
                </View>
            </View>
            <CheckButton 
                onPress={handleCheckExercise} 
                selected={done}
            />
        </View>
    )
}