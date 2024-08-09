import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigations/appRoutes';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { APP_IMAGE } from '../../utils/constants';
import { globalStyles } from '../../styles/globalStyles';
import { scale } from '../../utils/metrics';
import Animated, { FadeInLeft } from 'react-native-reanimated';

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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <AppHeader
                leftIcon={<Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={APP_IMAGE.arrowBackWhite}
                        style={globalStyles.backIcon}
                    />
                </Pressable>
                }
                style={{ borderBottomColor: 'transparent' }}
            // rightIcon={<Pressable hitSlop={10} onPress={() => navigation.navigate('Cart')}>
            //     <Image
            //         source={APP_IMAGE.shoppingBag}
            //         style={globalStyles.topRightHeaderIcon}
            //     />
            // </Pressable>}
            />
            <View style={{ marginHorizontal: scale(16), flex: 1 }}>
                <Animated.Text
                    entering={FadeInLeft.delay(400).duration(1000)}
                    style={{ ...globalStyles.semiBoldLargeText, color: '#fff', fontSize: 20, marginTop: 10, letterSpacing: 6 }}>Step
                    <Text style={{ ...globalStyles.boldLargeText, color: '#fff', fontSize: 34 }}>1</Text>
                </Animated.Text>
                <View style={{ marginTop: 10 }}>
                    {[1, 2, 3, 4].map((item, index) =>
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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})