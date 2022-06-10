import React from 'react'
import TrainingSet from '../TrainingSet'
import Abs from '../muscles/Abs'
import Back from '../muscles/Back'
import Biceps from '../muscles/Biceps'
import Chest from '../muscles/Chest'
import Gluteos from '../muscles/Gluteos'
import Legs from '../muscles/Legs'
import Shoulders from '../muscles/Shoulders'
import Triceps from '../muscles/Triceps'

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

export default ({id, name, exercises}) => {
    return (
        <TrainingSet key={id} title={name} icons={(exercises === undefined) ? null : generateMuscleListOfReactElements(exercises)} />
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

function generateMuscleListOfReactElements(exercises) {
    const muscleNames = []
    
    // Coloca grupos musculares sem repetição
    for (let exercise of exercises) {
        if (!muscleNames.includes(muscleMapping.get(exercise.muscle.toUpperCase())))
            muscleNames.push(muscleMapping.get(exercise.muscle.toUpperCase()))
    }

    return generateListOfReactElements(muscleNames)
}