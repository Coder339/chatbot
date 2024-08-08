import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { scale } from '../utils/metrics'

export default function AppHeader(props: any) {
    const { leftPress, titleBox, rightIcon, leftIcon, rightPress, titleStyle } = props
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {leftIcon ?
                    <Pressable hitSlop={30} onPress={leftPress}>
                        {leftIcon}
                    </Pressable>
                    :
                    <View />
                }
                {titleBox}
            </View>
            {rightIcon ?
                <Pressable onPress={rightPress} hitSlop={30}>
                    {rightIcon}
                </Pressable>
                :
                <View />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        // backgroundColor: 'blue',
        paddingBottom: scale(8),
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.2)'
        // width: '100%'
    }
})