/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './src/navigations/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store/store';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

type SectionProps = PropsWithChildren<{
	title: string;
}>;


function App(): React.JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<Provider store={store}>
			<PersistGate loading={<View><Text>Loading...</Text></View>} persistor={persistor}>
				<View style={{ flex: 1, backgroundColor: '#fff' }}>
					<StatusBar
						barStyle={'light-content'}
						backgroundColor={'transparent'}
						translucent={true}
					/>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<NavigationContainer>
							<BottomSheetModalProvider>
								<RootStackScreen />
							</BottomSheetModalProvider>
						</NavigationContainer>
					</GestureHandlerRootView>
				</View>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;
