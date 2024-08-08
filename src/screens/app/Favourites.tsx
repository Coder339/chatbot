import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Pressable, Image, Alert, View } from 'react-native';
import { scale } from '../../utils/metrics';
import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
// import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigations/appRoutes';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import DATA from '../../products.json';
import AppHeader from '../../components/AppHeader';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { dislikeRecipe } from '../../redux/slices/recipeSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import RecipeListing from '../../components/RecipeListing';

type FavouritesNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Favourites'>;
type FavouritesScreenRouteProp = RouteProp<AppStackParamList, 'Favourites'>;

interface ItemProps {
    item: any,
    index: number
}

interface WishlistScreenProps {
    navigation: FavouritesNavigationProp;
    route: FavouritesScreenRouteProp;
    // Define your component props here
}

export default function Favourites({ navigation, route }: WishlistScreenProps) {
    const wishlist = useAppSelector(state => state.recipes.favourites);
    const dispatch = useAppDispatch()

    const insets = useSafeAreaInsets()

    console.log('insets.top', insets.top);

    const handleDislike = (product: any) => {
        console.log('CHECK-recipes-DISLIKE', product);
        dispatch(dislikeRecipe(product));
    };

    // const handleAddToCart = () => {
    //     dispatch(addToCart(product));
    // };


    return (
        <SafeAreaView style={{ flex: 1, marginTop: insets.top }}>
            <AppHeader
                leftIcon={<Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={APP_IMAGE.arrowBack}
                        style={globalStyles.backIcon}
                    />
                </Pressable>
                }
            // rightIcon={<Pressable hitSlop={10} onPress={() => navigation.navigate('Cart')}>
            //     <Image
            //         source={APP_IMAGE.shoppingBag}
            //         style={globalStyles.topRightHeaderIcon}
            //     />
            // </Pressable>}
            />
            <RecipeListing
                data={wishlist}
                navigation={navigation}
                contentContainerStyle={{ paddingTop: scale(6) }}
                isHome={false}
                handleDislike={handleDislike}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({


})