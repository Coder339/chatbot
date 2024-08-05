import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecipeListing from '../components/RecipeListing'
import ListingTopHeader from '../components/ListingTopHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Voice from '@react-native-voice/voice';
import { KEYCHAIN } from '../utils/keychain'
import { API_BASE_URL } from '../utils/urls'

export default function Home() {
    const insets = useSafeAreaInsets()
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(false)

    Voice.onSpeechResults = (event: any) => {
        console.log('VOICE', event);

        setIsListening(false)
        Voice.stop();
        setQuery(event.value[0]);
        fetchRecipes(event.value[0]);
    };

    Voice.onSpeechStart = (event: any) => {
        console.log('onSpeechStart', event);;
    };

    Voice.onSpeechError = (event: any) => {
        console.log('onSpeechError', event);;
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

            setRecipes(data.results);
            setLoading(false)
            await AsyncStorage.setItem('lastSearch', JSON.stringify(data.results));
        } catch (error) {
            console.error(error);
            setLoading(false)

        }
    };

    const startListening = () => {
        setQuery('')
        setIsListening(true);
        Voice.start('en-US');
    };

    const stopListening = () => {
        setIsListening(false);
        Voice.stop();
    };


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
                isListening={isListening}
                setIsListening={setIsListening}
                startListening={startListening}
                stopListening={stopListening}
            />
            <RecipeListing
                data={recipes}
                loading={loading}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})