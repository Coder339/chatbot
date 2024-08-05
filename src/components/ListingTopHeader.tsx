import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { scale } from '../utils/metrics'
import { APP_IMAGE } from '../utils/constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH, globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import LottieView from 'lottie-react-native';
import { fonts } from '../styles/fonts';

export default function ListingTopHeader(props: any) {

    return (
        <View style={styles.container}>
            <Text style={{ ...globalStyles.boldLargeText }}>CHATBOT</Text>
            <View style={styles.searchContainer}>
                {props.isListening &&
                    <LottieView source={require('../assets/animations/soundwave.json')} autoPlay loop style={{ width: 30, height: 40 }} />
                }
                <TextInput
                    value={props.query}
                    placeholder='voice search'
                    placeholderTextColor={'grey'}
                    style={{ ...globalStyles.regularLargeText, color: '#000', flex: 1, margin: 0, paddingVertical: 12, marginStart: 4 }}
                    editable={false}
                />
                <View style={styles.seprator} />
                <Pressable
                    hitSlop={10}
                    onPress={() => props.isListening ? props.stopListening() : props.startListening()}>
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
        marginHorizontal: scale(8),
        marginBottom: scale(4)
    },
    topRightHeaderIcon: {
        width: scale(30),
        height: scale(30),
        marginEnd: scale(6)
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 14,
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
    }
})