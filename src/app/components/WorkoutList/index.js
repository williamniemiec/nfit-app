import React from 'react'
import { View } from 'react-native'
import TrainingSet from '../TrainingSet'
import Abs from '../muscles/Abs'
import Back from '../muscles/Back'
import Biceps from '../muscles/Biceps'
import Chest from '../muscles/Chest'
import Gluteos from '../muscles/Gluteos'
import Legs from '../muscles/Legs'
import Shoulders from '../muscles/Shoulders'
import Triceps from '../muscles/Triceps'
import styles from './styles'
import presetWorkouts from '../../assets/presetWorkouts.json'

const muscleMapping = new Map()
muscleMapping.set("ABS", <Abs />)
muscleMapping.set("BACK", <Back />)
muscleMapping.set("BICEPS", <Biceps />)
muscleMapping.set("CHEST", <Chest />)
muscleMapping.set("GLUTEOS", <Gluteos />)
muscleMapping.set("LEGS", <Legs />)
muscleMapping.set("SHOULDERS", <Shoulders />)
muscleMapping.set("TRICEPS", <Triceps />)

const workoutList = new Map()

const TrainingItem = ({id, name, exercises}) => {
    return (
        <TrainingSet title={name} icons={generateMuscleListOfReactElements(exercises)} />
    )
}

function generateListOfReactElements(elements) {
    const rendered = [];
    const getItems = elements.map((item, key) => {
        const component = React.createElement(item.type, {key:key});
        rendered.push(component);
    });

    return rendered
}

export function generateMuscleListOfReactElements(exercises) {
    const muscleNames = []
    
    for (let exercise of exercises) {
        if (!muscleNames.includes(muscleMapping.get(exercise.muscle.toUpperCase())))
            muscleNames.push(muscleMapping.get(exercise.muscle.toUpperCase()))
    }

    return generateListOfReactElements(muscleNames)
}

const addWorkout = (workout, index) => {
    const workoutComponent = <TrainingItem 
        item={workout} 
        id={workout.id} 
        name={workout.name} 
        exercises={workout.exercises} 
    />

    workoutList.set(workout.id, workoutComponent) 
}

export default function generateWorkoutList() {
    for (let workout of presetWorkouts) {
        addWorkout(workout)
    }
    
    return workoutList
}
