import React, { useState } from 'react'
import { View, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
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
import AddButton from '../button/small/AddButton'
import { FlatList } from 'react-native'

const muscleMapping = new Map()

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
    
    for (let exercise of exercises) {
        if (!muscleNames.includes(muscleMapping.get(exercise.muscle.toUpperCase())))
            muscleNames.push(muscleMapping.get(exercise.muscle.toUpperCase()))
    }

    return generateListOfReactElements(muscleNames)
}

export default function Trainings({style, data, onPress}) {
    muscleMapping.set("ABS", <Abs />)
    muscleMapping.set("BACK", <Back />)
    muscleMapping.set("BICEPS", <Biceps />)
    muscleMapping.set("CHEST", <Chest />)
    muscleMapping.set("GLUTEOS", <Gluteos />)
    muscleMapping.set("LEGS", <Legs />)
    muscleMapping.set("SHOULDERS", <Shoulders />)
    muscleMapping.set("TRICEPS", <Triceps />)

    const [selectedOps, setSelectedOps] = useState([])

    const handlePress = (id, name, exercises) => {
        const selected = !selectedOps.includes(id)

        if (selectedOps.includes(id))
            setSelectedOps(list => {
                let newList = [...list]
                newList = newList.filter((item, index) => item != id)
                return newList
            })
        else
            setSelectedOps(list => {
                const newList = [...list]
                newList.push(id)
                return newList
            })

        const workout = {id, name, exercises}
        
        onPress(workout, selected)
    }

    const TrainingItem = ({id, name, exercises}) => {
        return (
            <View key={id} style={styles.area}>
                <TrainingSet title={name} icons={generateMuscleListOfReactElements(exercises)} />
                <AddButton onPress={() => handlePress(id, name, exercises)} selected={selectedOps.includes(id)} />
            </View>
        )
    }

    return (
        <FlatList 
            style={[{width:'100%'}, style]}
            data={data}
            renderItem={(item, index) => <TrainingItem id={item.item.id} name={item.item.name} exercises={item.item.exercises} />}
        />
    )
}