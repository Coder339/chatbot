import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Splash from '../screens/auth/Splash';

import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/app/Home';
import AppStack from './appRoutes';
import { NavigatorScreenParams } from '@react-navigation/native';
import AuthStack, { AuthStackParamList } from './authRoutes';

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: undefined;
    Splash: undefined;
    Register: undefined;
    Login: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackScreen() {

    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{
                    headerShown: false,
                }}
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
