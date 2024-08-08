import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
	//   let routeName;
	//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

	// useEffect(() => {
	//     EventRegister.on("alreadyLaunched", () => {
	//     setIsFirstLaunch(false)
	//     })
	//     AsyncStorage.getItem('alreadyLaunched').then(value => {
	//     if (value === null) {
	//         setIsFirstLaunch(true);
	//     } else {
	//         setIsFirstLaunch(false);
	//     }
	//     });
	//     return () => {
	//     EventRegister.removeEventListener("alreadyLaunched")
	//     }
	// }, []);

	// if (isFirstLaunch === null) {
	//     return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
	// } else if (isFirstLaunch === true) {
	//     routeName = 'onboarding';
	//     // setRouteName('onboard')
	// } else {
	//     routeName = 'login';
	// }

	return (
		<Stack.Navigator
			initialRouteName={'Login'}
			screenOptions={{ gestureEnabled: false }}>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={Register}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default AuthStack;
