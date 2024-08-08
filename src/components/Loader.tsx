import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/globalStyles';
import { colors } from '../styles/colors';

// top: SCREEN_HEIGHT / 2.5, left: SCREEN_WIDTH / 3

interface LoaderProps {
    visible: boolean
}

const Loader = (props: LoaderProps) => {
    return (
        // <Modal
        //     transparent={true}
        //     animationType="none">
        <View style={{
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            {/* <Image
                source={require('../assets/images/gifs/closerGIF.gif')}
                style={{ width: 150, height: 150 }}
            /> */}
            <ActivityIndicator
                size={20}
                color={colors.primary}
            />
        </View>
        // </Modal>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1,
        backgroundColor: '#rgba(0,0,0,0.2)',
        top: 200,
        position: 'absolute'
        // marginTop:SCREEN_HEIGHT / 8
    },
})

export default Loader;