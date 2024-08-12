import { Image, PanResponder, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigations/appRoutes';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { APP_IMAGE } from '../../utils/constants';
import { SCREEN_HEIGHT, SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import { scale } from '../../utils/metrics';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type InstructionslNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Instructions'>;
type InstructionsScreenRouteProp = RouteProp<AppStackParamList, 'Instructions'>;


interface InstructionsScreenProps {
    navigation: InstructionslNavigationProp;
    route: InstructionsScreenRouteProp;
    // Define your component props here
}


interface ItemProps {
    item: any,
    index: number
}

export default function Instructions({ navigation, route }: InstructionsScreenProps) {
    const [step, setStep] = useState(1)
    const [steps, setSteps] = useState([1, 2, 3, 4, 5])
    const insets = useSafeAreaInsets()

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };


    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.x0 < SCREEN_WIDTH / 2) {
                    // Tap on the left side
                    setStep((prevCount) => Math.max(1, prevCount - 1));
                } else {
                    // Tap on the right side
                    setStep((prevCount) => Math.min(steps.length, prevCount + 1));
                }
                ReactNativeHapticFeedback.trigger("impactHeavy", options);

            },
        })
    ).current;

    console.log('step', step);


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: colors.primary, }}
            {...panResponder.panHandlers}
        >
            <AppHeader
                leftIcon={<Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={APP_IMAGE.arrowBackWhite}
                        style={globalStyles.backIcon}
                    />
                </Pressable>
                }
                style={{ borderBottomColor: 'transparent', marginTop: insets.top }}
            />
            <View style={{ marginHorizontal: scale(16), flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    marginTop: 10,
                }}>
                    <Animated.Text
                        entering={FadeInLeft.delay(400).duration(1000)}
                        style={{ ...globalStyles.semiBoldLargeText, color: '#fff', fontSize: 20, letterSpacing: 6 }}>Step
                        <Text style={{ ...globalStyles.boldLargeText, color: '#fff', fontSize: 34 }}>{step}</Text>
                    </Animated.Text>
                    <View style={{ flexDirection: "row", }}>
                        {steps.map((item, index) =>
                            <View style={{
                                ...styles.stepBar,
                                width: (SCREEN_WIDTH - scale(200)) / steps.length,
                                backgroundColor: index + 1 === step ? '#fff' : "rgba(255,255,255,0.3)"
                            }} />
                        )}
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10 }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) =>
                            <View key={index} style={{ marginBottom: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                    <Text style={{ ...globalStyles.semiBoldLargeText, color: '#fff' }}>{index + 1}</Text>
                                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#fff', marginStart: 12, width: '100%' }} />
                                </View>
                                <Animated.Text
                                    entering={FadeInLeft.delay(400).duration(1500)}
                                    style={{ ...globalStyles.regularLargeText, color: '#fff', letterSpacing: 1, fontSize: 18 }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, itaque mollitia vitae est commodi adipisci aperiam harum exercitationem accusamus pariatur culpa error non debitis quo unde eum magni nulla eius.</Animated.Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    stepBar: {
        // width: SCREEN_WIDTH / 5,
        height: 4,
        // backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: 8,
        marginHorizontal: 2
    },

})