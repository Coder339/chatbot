import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecipeListing from '../../components/RecipeListing'
import ListingTopHeader from '../../components/ListingTopHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Voice from '@react-native-voice/voice';
import { KEYCHAIN } from '../../utils/keychain'
import { API_BASE_URL } from '../../utils/urls'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../navigations/appRoutes'
import { RouteProp } from '@react-navigation/native'
import _ from 'lodash';
import { dislikeRecipe, getRecipes, likeRecipe } from '../../redux/slices/recipeSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'


type HomeNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<AppStackParamList, 'Home'>;

interface ItemProps {
    item: any,
    index: number
}

interface HomeScreenProps {
    navigation: HomeNavigationProp;
    route: HomeScreenRouteProp;
    // Define your component props here
}

export default function Home({ navigation, route }: HomeScreenProps) {
    const insets = useSafeAreaInsets()
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(false)
    const recipeData = useAppSelector(state => state.recipes.recipes)

    const dispatch = useAppDispatch()

    Voice.onSpeechResults = (event: any) => {
        console.log(`VOICE ${Platform.OS}`, event);

        setIsListening(false)
        Voice.stop();
        setQuery(event.value[0]);
        // fetchRecipes(event.value[0]);
        dispatch(getRecipes(event.value[0]))
    };

    Voice.onSpeechStart = (event: any) => {
        console.log(`onSpeechStart ${Platform.OS}`, event);;
    };

    Voice.onSpeechError = (event: any) => {
        console.log(`onSpeechError ${Platform.OS}`, event);;
    };

    const fetchRecipes = async (searchQuery: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}?apiKey=${KEYCHAIN.SPOONACULAR_API_KEY}&query=${searchQuery}&number=50&offset=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                }
            })
            const data = await response.json();
            // console.log('DATXXX', data);


            setRecipes(data.results);
            setLoading(false)
            await AsyncStorage.setItem('lastSearch', JSON.stringify(data.results));
        } catch (error) {
            console.error(error);
            setLoading(false)

        }
    };

    const startListening = async () => {
        setQuery('')
        setIsListening(true);
        await Voice.start('en-GB');
    };

    const stopListening = () => {
        setIsListening(false);
        Voice.stop();
    };

    const handleLike = (recipe: any) => {
        console.log('CHECK-recipe-LIKE', recipe);

        dispatch(likeRecipe(recipe));
    };

    const handleDislike = (recipe: any) => {
        console.log('CHECK-recipe-DISLIKE', recipe);
        dispatch(dislikeRecipe(recipe));
    };

    const SearchRecipes = (searchTerm: string) => {
        // console.log('searchTerm', searchTerm);
        // fetchRecipes(searchTerm)
        dispatch(getRecipes(searchTerm))

        // Perform search here
    }

    const handleSearch = useCallback(_.debounce(SearchRecipes, 500), []);


    useEffect(() => {
        // setLoading(true)
        // fetchRecipes('chicken')

        const loadLastSearch = async () => {
            const lastSearch = await AsyncStorage.getItem('lastSearch');

            if (lastSearch) {
                setRecipes(JSON.parse(lastSearch));
            }
        };
        loadLastSearch();
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, marginTop: insets.top }}>
            <ListingTopHeader
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                isListening={isListening}
                setIsListening={setIsListening}
                startListening={startListening}
                stopListening={stopListening}
            />
            <RecipeListing
                data={recipeData}
                loading={loading}
                navigation={navigation}
                handleLike={handleLike}
                handleDislike={handleDislike}
                isHome={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})