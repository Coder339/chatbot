import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import {useRoute} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_IMAGE } from '../utils/constants';
import Home from '../screens/app/Home';
import Account from '../screens/app/Account';
import { scale } from '../utils/metrics';
import Track from '../screens/app/Track';
import Favourites from '../screens/app/Favourites';
import RecipeDetail from '../screens/app/RecipeDetail';
import Instructions from '../screens/app/Instructions';


export type AppStackParamList = {
    Home: undefined;
    TabStack: undefined;
    Account: { isOtherUser: boolean } | undefined;
    Track: undefined;
    Favourites: undefined;
    RecipeDetail: { recipeId: string } | undefined;
    Instructions: undefined
};

type TabStackParamList = {
    HomeStack: undefined,
    AccountStack: undefined,
    TrackStack: undefined

};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Favourites"
                component={Favourites}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}



function AccountStack() {
    return (
        <Stack.Navigator initialRouteName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function TrackStack() {
    return (
        <Stack.Navigator initialRouteName="Track">
            <Stack.Screen
                name="Track"
                component={Track}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}


function TabStack() {
    const insets = useSafeAreaInsets();
    // const routeTab = useRoute();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <Tab.Navigator
                initialRouteName="HomeStack"
                screenOptions={{
                    tabBarStyle: {
                        paddingTop: 8,
                        position: "absolute",
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#fff',

                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarHideOnKeyboard: true
                }}

            >
                <Tab.Screen
                    name={'HomeStack'}
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View>
                                <Image
                                    style={styles.icon}
                                    source={APP_IMAGE.homeActive}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name={'TrackStack'}
                    component={TrackStack}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View>
                                <Image
                                    style={styles.icon}
                                    source={focused ? APP_IMAGE.trackActive : APP_IMAGE.trackInActive}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name={'AccountStack'}
                    component={AccountStack}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View>
                                <Image
                                    style={{ ...styles.icon, width: scale(30), height: scale(30) }}
                                    source={focused ? APP_IMAGE.profileActive : APP_IMAGE.profileInActive}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                        // tabBarLabel:i18n.t('tabs.more')
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}



function AppStack() {
    return (
        <Stack.Navigator initialRouteName="TabStack">
            <Stack.Screen
                name="TabStack"
                component={TabStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RecipeDetail"
                component={RecipeDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Instructions"
                component={Instructions}
                options={{ headerShown: false, animation: 'fade_from_bottom' }}

            />
        </Stack.Navigator>
    );
}

export default AppStack;

const styles = StyleSheet.create({
    tabBarIconWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        // backgroundColor:'red'
        // resizeMode: 'contain',
    },
});