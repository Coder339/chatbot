import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecipeListing from '../../components/RecipeListing'
import ListingTopHeader from '../../components/ListingTopHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
import Voice from '@react-native-voice/voice';
import { KEYCHAIN } from '../../utils/keychain'
import { API_BASE_URL } from '../../utils/urls'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../navigations/appRoutes'
import { RouteProp } from '@react-navigation/native'
import _ from 'lodash';
import { dislikeRecipe, getRecipes, likeRecipe } from '../../redux/slices/recipeSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { colors } from '../../styles/colors'
import LottieView from 'lottie-react-native';
import { scale } from '../../utils/metrics'


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

const RECIPE_TABS = [
    { name: 'BreakFast', selected: false },
    { name: 'Brunch', selected: false },
    { name: 'Lunch', selected: false },
    { name: 'Dinner', selected: false },
    { name: 'Drinks', selected: false },
    { name: 'Snacks', selected: false },
    { name: 'Pizza', selected: false },
    { name: 'Chicken', selected: false },
    // Add more options here
];

export default function Home({ navigation, route }: HomeScreenProps) {
    const insets = useSafeAreaInsets()
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(false)
    const recipeData = useAppSelector(state => state.recipes.recipes)

    const [tabs, setTabs] = useState(RECIPE_TABS)

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


    const handleTabPress = (item: string, index: number) => {
        const updatedTabs = tabs.map((tab, i) => ({
            ...tab,
            selected: i === index,
        }));
        setTabs(updatedTabs);
        SearchRecipes(item)

    };


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
            <View style={{}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 10 }}>
                    {tabs.map((tab, index) => (
                        <Pressable
                            key={index}
                            onPress={() => handleTabPress(tab.name, index)}
                            style={{
                                padding: 10,
                                backgroundColor: tab.selected ? colors.primary : 'transparent',
                                marginHorizontal: 4,
                                borderRadius: 4,
                                borderWidth: !tab.selected ? 1 : 0,
                                borderColor: colors.grey1
                            }}
                        >
                            <Text style={{ ...globalStyles.semiBoldLargeText, color: tab.selected ? '#fff' : '#000' }}>{tab.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            {/* <View style={{ flex: 1 }}> */}
            <RecipeListing
                data={recipeData}
                loading={loading}
                navigation={navigation}
                handleLike={handleLike}
                handleDislike={handleDislike}
                isHome={true}
            />
            {/* </View> */}
            <Pressable style={{ position: 'absolute', right: 20, bottom: scale(10) }}>
                <LottieView
                    source={require('../../assets/animations/floatingButton.json')}
                    autoPlay
                    loop
                    style={{ width: scale(70), height: scale(70) }}
                />
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})