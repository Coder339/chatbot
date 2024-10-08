import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { scale } from '../utils/metrics'
import { APP_IMAGE } from '../utils/constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH, globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import LottieView from 'lottie-react-native';
import { fonts } from '../styles/fonts';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

export default function ListingTopHeader(props: any) {
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    return (
        <View style={styles.container}>
            <Text style={{ ...globalStyles.boldLargeText }}>KNCG</Text>
            <View style={styles.searchContainer}>
                {props.isListening &&
                    <LottieView source={require('../assets/animations/soundwave.json')} autoPlay loop style={{ width: 30, height: 40 }} />
                }
                <TextInput
                    value={props.query}
                    onChangeText={(text) => {
                        props.setQuery(text)
                        props.handleSearch(text)
                    }}
                    placeholder='search recipe'
                    placeholderTextColor={'grey'}
                    style={styles.input}
                // editable={false}
                />
                <View style={styles.seprator} />
                <Pressable
                    hitSlop={10}
                    onPress={() => {
                        ReactNativeHapticFeedback.trigger("impactHeavy", options)
                        props.isListening ?
                            (props.stopListening()) :
                            props.startListening()
                    }}>
                    <Image
                        source={props.isListening ? APP_IMAGE.stopListen : APP_IMAGE.mic}
                        style={styles.topRightHeaderIcon}
                        resizeMode='cover'
                    />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: scale(12),
        marginBottom: scale(4),
    },
    topRightHeaderIcon: {
        width: scale(30),
        height: scale(30),
        marginEnd: scale(6)
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 1,
        marginStart: 14,
        borderRadius: 20,
        backgroundColor: colors.lightBlue,
        paddingStart: 8,
        alignItems: 'center'
    },
    seprator: {
        width: 1,
        height: scale(26),
        backgroundColor: colors.grey,
        marginHorizontal: 6, alignSelf: 'center'
    },
    input: {
        ...globalStyles.regularLargeText,
        color: '#000',
        flex: 1,
        margin: 0,
        paddingVertical: 12,
        marginStart: 4
    }
})