import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { APP_IMAGE, APP_TEXT } from '../../utils/constants'
import { SCREEN_HEIGHT } from '../../styles/globalStyles'
import { scale } from '../../utils/metrics'
import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import AppButton from '../../components/AppButton'
import Carousel from 'react-native-snap-carousel';
import PaginationDots from '../../components/PaginationDots'
import * as Animatable from 'react-native-animatable';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated'
// import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AppStackParamList } from '../../navigations/appRoutes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { API_BASE_URL } from '../../utils/urls'
import { KEYCHAIN } from '../../utils/keychain'
import { colors } from '../../styles/colors'
import RenderHtml from 'react-native-render-html';
import { fonts } from '../../styles/fonts'

type RecipeDetailNavigationProp = NativeStackNavigationProp<AppStackParamList, 'RecipeDetail'>;
type RecipeDetailScreenRouteProp = RouteProp<AppStackParamList, 'RecipeDetail'>;


interface ProductDetailScreenProps {
    navigation: RecipeDetailNavigationProp;
    route: RecipeDetailScreenRouteProp;
    // Define your component props here
}


interface ItemProps {
    item: any,
    index: number
}

const tagsStyles = {
    body: {
        // whiteSpace: 'normal',
        color: '#000',
        fontFamily: fonts.regularFont,
        fontSize: 18
    },
    b: {
        fontSize: 16,
        color: colors.primary,
        fontFamily: fonts.regularFont,
    }
};

export default function RecipeDetail({ navigation, route }: ProductDetailScreenProps) {

    const recipeId = route.params?.recipeId
    console.log('recipeId', recipeId);
    const { width } = useWindowDimensions();

    const _carousel = useRef(null)
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const [recipeDetail, setRecipeDetail] = useState<any>(null)
    // const [first, setfirst] = useState(second)

    // const source = {
    //     html: `
    //     <p style='text-align:center;'>
    //         Hello World!
    //     </p>`
    // };

    const fetchRecipeDetail = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${recipeId}/information?apiKey=${KEYCHAIN.SPOONACULAR_API_KEY}&includeNutrition=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                }
            })
            const data = await response.json();
            console.log('DETAIL', data.summary);

            setRecipeDetail(data);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)

        }
    };

    useEffect(() => {
        fetchRecipeDetail()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Animated.View
                entering={FadeInUp.delay(500)}
                style={[styles.header, { ...styles.overlay, height: SCREEN_HEIGHT > 667 ? 90 : 70 }]}
            >
                <View style={{ ...styles.overlayHeader, }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image
                            source={APP_IMAGE.arrowBackWhite}
                            style={styles.backIcon}
                        />
                    </Pressable>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable
                            hitSlop={10}
                            onPress={() => Alert.alert('like')}
                            style={{ marginEnd: scale(8) }}
                        >
                            <Image
                                source={APP_IMAGE.wishlistWhite}
                                style={styles.topRightHeaderIcon}
                            />
                        </Pressable>
                        <Pressable
                            hitSlop={10}
                            onPress={() => { }}
                        >
                            <Image
                                source={APP_IMAGE.track}
                                style={{ height: scale(28), width: scale(28) }}
                            />
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
            <View style={{ flex: 1 }}>
                <View style={{
                    position: "relative",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <Animated.View
                        entering={FadeInLeft.delay(300)}
                        style={{}}
                    // sharedTransitionTag={route.params?.sharedName}
                    >
                        <Image
                            source={{ uri: recipeDetail?.image }}
                            style={{ width: 'auto', height: SCREEN_HEIGHT / 2.2, backgroundColor: colors.grey }}
                            resizeMode='cover'
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInRight.delay(400)}
                        style={{
                            backgroundColor: "#000",
                            borderRadius: 12,
                            paddingVertical: 8,
                            paddingHorizontal: 6,
                            alignSelf: 'baseline',
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            alignItems: 'center',
                            marginHorizontal: 12

                            // justifyContent:"center"
                        }}>
                        <Text style={{ ...globalStyles.boldLargeText, color: '#fff', }}>{activeIndex + 1}</Text>
                        <View style={{ width: 12, borderTopWidth: 1, borderColor: '#fff' }} />
                        <Text style={{ ...globalStyles.boldLargeText, color: '#fff' }}>8</Text>
                    </Animated.View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ margin: scale(28) }}>
                        <Animatable.Text animation={'zoomInDown'} style={{ ...globalStyles.boldLargeText, color: '#000', fontSize: 22 }}>{recipeDetail?.title}</Animatable.Text>
                        <Animatable.Text animation={'zoomInDown'} style={{ ...globalStyles.semiBoldLargeText, color: '#000', marginTop: 4, marginBottom: 16 }}>ReadyIn : {recipeDetail?.readyInMinutes} Minutes</Animatable.Text>
                        {/* <Animatable.Text animation={'fadeInRight'} style={{ ...globalStyles.regularLargeText, color: '#000', marginTop: 16, fontSize: 18 }}>{recipeDetail?.summary}</Animatable.Text> */}
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: recipeDetail?.summary }}
                            tagsStyles={tagsStyles}
                            systemFonts={[fonts.regularFont]}

                        />
                    </View>
                </ScrollView>
            </View>
            <Animated.View
                entering={FadeInDown.delay(500)}
            // sharedTransitionTag={index.toString()}
            >
                <AppButton
                    text='Start Cooking'
                    onPress={() => { }}
                    style={{ borderwidth: 2, margin: 20, marginTop: 0 }}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        // height: 100,
        left: 0,
        right: 0,
        zIndex: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity as needed
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    overlayHeader: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: scale(16),
        marginBottom: scale(4),

    },
    topRightHeaderIcon: {
        width: scale(36),
        height: scale(36)
    },
    backIcon: {
        width: scale(30),
        height: scale(30)
    }
})