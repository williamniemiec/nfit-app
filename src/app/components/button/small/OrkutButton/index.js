import React from 'react'
import { TouchableHighlight, View } from "react-native";
import styles from './styles'

export default function OrkutButton({onPress, selected, color}) {
    const colorTheme = (color === undefined) ? '#ed238e' : color

    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor='transparent'
            style={[
                styles.circleBtn,
                {
                    borderColor: colorTheme,
                    backgroundColor: selected ? colorTheme : null,
                }
            ]}>
                <>
                </>
        </TouchableHighlight>
    )
}