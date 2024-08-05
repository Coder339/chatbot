import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// import {useRoute} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_IMAGE } from '../utils/constants';
import Home from '../screens/Home';


export type AppStackParamList = {
    Home: undefined;
    TabStack: undefined;
};

type TabStackParamList = {
    Home: undefined,

};

const Stack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();


function TabStack() {
    const insets = useSafeAreaInsets();
    // const routeTab = useRoute();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: {
                        paddingTop: 8,
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#fff',

                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name={'Home'}
                    component={Home}
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