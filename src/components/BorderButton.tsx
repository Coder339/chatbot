import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { colors } from '../styles/colors'
import { scale } from '../utils/metrics'


interface ButtonProps {
    onPress:() => void,
    textStyle:object,
    style:object,
    text:string
}

export default function BorderButton(props:ButtonProps) {
    return (
        <Pressable
            style={{ ...styles.buttonContainer, ...props.style }}
            onPress={props.onPress}
        >
            <Text style={{ ...styles.text, ...props.textStyle }}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: scale(2),
        borderWidth: 1,
        borderColor: colors.primary,
        padding: scale(12),
        alignItems: 'center'
    },
    text: {
        ...globalStyles.semiBoldLargeText,
        color: colors.primary,
        fontSize:scale(18)
    }
})