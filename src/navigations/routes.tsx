import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Splash from '../screens/Splash';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AppStack from './appRoutes';

export type RootStackParamList = {
    App: undefined;
    Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackScreen() {

    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="App"
                component={AppStack}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
