import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Animatable from 'react-native-animatable';
import GradientView from '../../components/GradientView';
import AnimatedTextWithDelay from '../../components/AnimatedTextWithDelay';
import { globalStyles } from '../../styles/globalStyles'


interface SplashProps {
    navigation: any
}
export default function Splash(props: SplashProps) {


    useEffect(() => {
        setTimeout(async () => {

            props.navigation.replace('Auth');

        }, 3000);


    }, []);

    return (
        <View style={{ flex: 1 }}>
            <GradientView style={styles.container}>
                <Text style={{ ...globalStyles.boldLargeText, color: '#fff', fontSize: 28 }}>K I N G  C O O K I N G</Text>
                {<AnimatedTextWithDelay width={400} />}
            </GradientView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // backgroundColor:colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {

        marginTop: 8,
        // ...globalStyles.boldLargeText,
        fontSize: 20,
        color: '#fff',
    }
})