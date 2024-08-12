import { StyleSheet, Text, View, Image, Pressable, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useRef, Dispatch, SetStateAction, } from 'react'
// import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
// import { Pressable } from 'react-native';
// import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../navigations/appRoutes';
import Animated, { BounceIn, BounceInDown, BounceInUp, FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import { scale } from '../../utils/metrics';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;
interface ItemProps {
    item: any,
    index: number,
    navigation: NavigationProp,  // pass 'any' if reusable 
    // removeHandler:(id:string|number)=>void
    handleLike?: (item: object) => void,
    handleDislike: (item: object) => void,
    isHome?: boolean
}

const RecipeItem: React.FC<ItemProps> = ({ item, index, navigation, handleLike, handleDislike, isHome }) => {

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    const animRef = useRef<null>(null)

    return (
        <Animated.View
            entering={FadeInDown.delay(200 * index)}
            style={{ position: 'relative' }}
        // sharedTransitionTag={index.toString()}
        >
            <Pressable
                style={{ margin: 4 }}
                onPress={() => { navigation.navigate('RecipeDetail', { recipeId: item?.id }) }}
            >
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

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                            <Animated.Text
                                entering={FadeInLeft.delay(400)}
                                style={{
                                    ...globalStyles.boldLargeText,
                                    ...styles.overlayText,
                                    fontSize: 16,
                                    flex: 1
                                }}
                                numberOfLines={1}
                            >{item?.title}</Animated.Text>
                            <Pressable
                                // style={!isHome ? { ...styles.borderIcon, marginRight: 6, } : null}
                                onPress={() => {
                                    ReactNativeHapticFeedback.trigger("impactHeavy", options);
                                    console.log('logITEMM', item);

                                    if (item.isLiked) {
                                        handleDislike(item);
                                    } else {
                                        if (handleLike) {
                                            handleLike(item)
                                            // animRef?.current?.play()
                                            // animRef?.current?.pause()
                                        }
                                    }

                                }}
                            >
                                {!isHome ?
                                    <Image source={APP_IMAGE.deleteWhite} style={{ width: 22, height: 22, marginRight: scale(4) }} />
                                    :
                                    <>
                                        {item?.isLiked ?
                                            <Animated.Image entering={BounceIn} source={APP_IMAGE.heartRed} style={{ width: 20, height: 20 }} />
                                            :
                                            <Image source={APP_IMAGE.heartWhite} style={{ width: 20, height: 20 }} />
                                        }
                                    </>
                                }
                            </Pressable>
                        </View>
                        <View>
                            <Animated.Text
                                entering={FadeInLeft.delay(600)}
                                style={{
                                    ...globalStyles.semiBoldMediumText,
                                    ...styles.overlayText,
                                    fontSize: 12,
                                }}>Tasty</Animated.Text>
                        </View>
                    </View>
                </View>

            </Pressable>
            {/* <Pressable style={{ position: 'absolute', top: ((SCREEN_WIDTH / 2 - scale(70))) / 2, left: ((SCREEN_WIDTH / 2 - scale(140))) / 2 }}>
                <LottieView
                    ref={animRef}
                    source={require('../../assets/animations/likeDribble.json')}
                    // autoPlay
                    loop
                    style={{ width: scale(140), height: scale(140) }}
                />
            </Pressable> */}
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