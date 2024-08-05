import { StyleSheet, Text, View, Image, Pressable, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useRef, Dispatch, SetStateAction, } from 'react'
// import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
// import { Pressable } from 'react-native';
// import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigations/appRoutes';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import { scale } from '../../utils/metrics';


interface ItemProps {
    item: any,
    index: number,
}

const RecipeItem: React.FC<ItemProps> = ({ item, index }) => {

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(200 * index)}
        // sharedTransitionTag={index.toString()}
        >
            <Pressable style={{ margin: 4 }}>
                <Image
                    source={{
                        uri: item?.image,
                        // priority: FastImage.priority.high,
                    }}
                    resizeMode="cover"
                    style={{ height: scale(280), width: (SCREEN_WIDTH / 2) - 4 * 2 - 4, borderRadius: 4, backgroundColor: 'lightgrey' }} //4*2 =>margin around each item * 2, 4=> container horizontalMargin - margin around each item
                />
                <View style={styles.overlay}>
                    <View style={{ margin: 8 }}>
                        <Animated.Text
                            entering={FadeInLeft.delay(400)}
                            style={{
                                ...globalStyles.boldLargeText,
                                ...styles.overlayText,
                                fontSize: 18,
                            }}>{item?.title}</Animated.Text>
                        <View>
                            <Animated.Text
                                entering={FadeInLeft.delay(600)}
                                style={{
                                    ...globalStyles.semiBoldMediumText,
                                    ...styles.overlayText,
                                    fontSize: 14,
                                }}>Tasty</Animated.Text>
                        </View>
                    </View>
                </View>

            </Pressable>
        </Animated.View>
    )
}


export default RecipeItem

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity as needed
        // alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4
    },
    overlayText: {
        color: 'white',
        fontWeight: 'bold',
        // marginHorizontal:12
    },
    borderIcon: {
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 4,
        paddingVertical: 6,
        paddingLeft: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})