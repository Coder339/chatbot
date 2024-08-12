import { Image, Pressable, StyleSheet, Text, View, TextInput, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal';
import ScrollContainer from '../ScrollContainer';
import { scale } from '../../utils/metrics';
import { globalStyles } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
// import i18n from '../../translations/i18n';
import { colors } from '../../styles/colors';
import AppButton from '../AppButton';
import i18n from '../../localization/i18n';
import DonutChart from '../DonutChart';
import AnimatedNumbers from 'react-native-animated-numbers';
import Animated, { FadeInLeft } from 'react-native-reanimated';

interface Props {
    // Define your component props here
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    onPress: () => void,
}

export default function NutritionModal(props: Props) {
    const { visible, setVisible, onPress } = props
    // const [animateToNumber, setAnimateToNumber] = React.useState(0);

    // useEffect(() => {
    //     setAnimateToNumber(animateToNumber + 43);
    // }, [])


    const sendLinkHandler = () => {
        // setVisible(false)
        onPress()
    }

    return (
        <Modal
            avoidKeyboard
            hasBackdrop={true}
            //  testID={'modal'}
            isVisible={visible}
            animationIn={'flipInX'}
            animationInTiming={1000}
            animationOut={'flipOutX'}
            animationOutTiming={1000}
            // useNativeDriverForBackdrop
            //  animationInTiming={800}
            onBackdropPress={() => {
                setVisible(false);
                // setAnimateToNumber(34)
            }}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection={'down'}
            style={{
                margin: 0,
                flex: 1,
                // backgroundColor: "red",
                // justifyContent:'flex-end'
            }}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={{
                        ...globalStyles.semiBoldLargeText,
                        fontSize: scale(22),
                    }}>Nutrition Value</Text>
                    {/* <Pressable 
                        onPress={() => setVisible(false)}
                        >
                        <Image
                            source={APP_IMAGE.cancel}
                            style={{ width: scale(26), height: scale(26) }}
                        />
                    </Pressable> */}
                </View>
                <DonutChart />
                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginTop: 12 }}>
                    <View>
                        <Text style={{ ...globalStyles.semiBoldMediumText, color: '#3BE9DE' }}>60%</Text>
                        <Animated.Text entering={FadeInLeft.delay(300).duration(2000)} style={{ ...globalStyles.semiBoldLargeText, color: colors.primary, fontSize: scale(28) }}>39.1g</Animated.Text>
                        {/* <AnimatedNumbers
                            animateToNumber={animateToNumber}
                            fontStyle={{ ...globalStyles.semiBoldLargeText, color: colors.primary, fontSize: scale(28) }}
                        /> */}
                        <Text style={{ ...globalStyles.semiBoldLargeText, color: colors.grey1 }}>{'Carbs'.toUpperCase()}</Text>
                        <Animated.View entering={FadeInLeft.delay(300).duration(2000)} style={{ width: 'auto', height: 2, backgroundColor: "#3BE9DE", marginTop: 10 }} />
                    </View>
                    <View>
                        <Text style={{ ...globalStyles.semiBoldMediumText, color: '#FF5733' }}>25%</Text>
                        <Animated.Text entering={FadeInLeft.delay(300).duration(2000)} style={{ ...globalStyles.semiBoldLargeText, color: colors.primary, fontSize: scale(28) }}>7.6g</Animated.Text>
                        <Text style={{ ...globalStyles.semiBoldLargeText, color: colors.grey1 }}>{'Fat'.toUpperCase()}</Text>
                        <Animated.View entering={FadeInLeft.delay(300).duration(2000)} style={{ width: 'auto', height: 2, backgroundColor: "#FF5733", marginTop: 10 }} />
                    </View>
                    <View>
                        <Text style={{ ...globalStyles.semiBoldMediumText, color: '#006DFF' }}>15%</Text>
                        <Animated.Text entering={FadeInLeft.delay(300).duration(2000)} style={{ ...globalStyles.semiBoldLargeText, color: colors.primary, fontSize: scale(28) }}>6.8g</Animated.Text>
                        <Text style={{ ...globalStyles.semiBoldLargeText, color: colors.grey1 }}>{'Protein'.toUpperCase()}</Text>
                        <Animated.View entering={FadeInLeft.delay(300).duration(2000)} style={{ width: 'auto', height: 2, backgroundColor: "#006DFF", marginTop: 10 }} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    tagline: {
        ...globalStyles.regularLargeText,
        marginTop: scale(14),
        lineHeight: 23,
        textAlign: 'left'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#fff',
        padding: scale(20),
        borderRadius: scale(2),
        marginHorizontal: scale(20),
    }
})