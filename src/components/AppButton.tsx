import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../styles/colors'
import { fonts } from '../styles/fonts'
import { scale } from '../utils/metrics'


interface propStyle {
    text: string,
    onPress: () => void,
    disabled?: boolean,
    textStyle?: object,
    style?: object
}

export default function AppButton(props: propStyle) {
    const { text, onPress, disabled = false } = props
    return (
        <Pressable disabled={disabled} onPress={onPress} style={{ ...styles.button, ...props.style }}>
            <Text style={{ ...styles.buttonText, ...props.textStyle }}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        // height:50,
        paddingVertical: scale(12),
        borderRadius: scale(2),
    },
    buttonText: {
        // color:'#fff',
        color: '#fff',
        // fontWeight:'bold',
        fontFamily: fonts.semiBoldFont,
        fontSize: scale(20),
    },


})