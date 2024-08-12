import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Platform, TextInput } from 'react-native';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList, TabStackParamList } from '../../navigations/appRoutes';
import { RouteProp } from '@react-navigation/native';
import AppView from '../../components/AppView';
// import CenteredHeader from '../../components/centeredHeader';
import { scale } from '../../utils/metrics';
import { APP_IMAGE } from '../../utils/constants';
import { globalStyles } from '../../styles/globalStyles';
import { Pressable } from 'react-native';
import { colors } from '../../styles/colors';
import ConversationItem from '../../components/items/conversationItem';
import DeviceInfo from 'react-native-device-info';
import { KEYCHAIN } from '../../utils/keychain';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../../components/AppHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<TabStackParamList, 'Gptbot'>;

interface ConversationProps {
    navigation: NavigationProp;
    // Define your component props here
}

type MessageType = {
    type: 'message' | 'image';
    message: string;
    direction: 'left' | 'right';
    // stickers: string[];
};


const Gptbot: React.FC<ConversationProps> = ({ navigation }) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [longpressIndex, setLongpressIndex] = useState<number | null>(null)
    const [message, setMessage] = useState<string>('')
    const inputRef = useRef(null)

    const insets = useSafeAreaInsets()

    let hasNotch = DeviceInfo.hasNotch();


    const [chatData, setChatData] = useState<Array<MessageType>>([
        { type: 'message', message: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄", direction: 'left' },
        { type: 'message', message: "Haha truly! Nice to meet you Roxanne! What about a cup of coffee today evening? ☕️ ", direction: 'right' },
        { type: 'message', message: "Sure, let’s do it!  😊", direction: 'left' },
        { type: 'message', message: "Great I will write later the exact time and place. See you soon!", direction: 'right' },
        { type: 'message', message: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄", direction: 'left' },
        { type: 'message', message: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄", direction: 'right' },
        { type: 'message', message: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄", direction: 'left' },
        { type: 'image', message: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894__480.jpg", direction: 'left' },
        { type: 'image', message: "https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863__480.jpg", direction: 'right' },
    ])

    const Seprator = () => {
        return (
            <View style={{ height: 10, width: 'auto' }} />
        )
    }

    const InputContainer = () => {
        return (
            <View style={{
                ...styles.inputContainer,
                backgroundColor: colors.lightBlue,
                // paddingBottom: hasNotch ? scale(20) : scale(4)
            }}>
                {/* <Pressable 
                    onPress={()=>setIsVisible(true)}
                    style={{justifyContent:'flex-end',paddingBottom:scale(15)}}
                    >
                    <Image 
                        source={APP_IMAGE.plus} 
                        style={{width:scale(20),height:scale(20),marginEnd:12}}
                    />
                </Pressable> */}
                <TextInput
                    ref={inputRef}
                    placeholder='Add a prompt'
                    placeholderTextColor={'gray'}
                    style={{
                        paddingBottom: Platform.OS === 'ios' ? scale(10) : scale(14),
                        paddingStart: scale(4),
                        flex: 1,
                        ...globalStyles.regularLargeText,
                        padding: 0,
                        margin: 0,
                        borderWidth: 0.5,
                        borderRadius: 8,
                        borderColor: colors.primary,
                        marginVertical: 4,
                        // textAlign:'center',
                        // marginTop:Platform.OS === 'ios' ? scale(10) : 0
                        paddingTop: Platform.OS === 'ios' ? scale(14) : scale(12),
                        maxHeight: 120
                        // backgroundColor:'red'
                    }}
                    // textAlignVertical='top'
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    // onFocus={()=>{
                    //     setUpdateEvent(false)
                    //     setIsSearching(false)
                    // }}
                    multiline
                />
                <Pressable
                    hitSlop={10}
                    style={{ justifyContent: "flex-end", paddingBottom: scale(15), marginStart: scale(12) }}
                // onPress={()=>{
                // if(containsHttpsLink(message)){
                //     SendMessageHandler(message,'link')
                // }else{
                //     SendMessageHandler(message,'message')
                // }
                // }}
                >
                    {message !== '' &&
                        <Image
                            source={APP_IMAGE.sendMessage}
                            style={{ ...globalStyles.mediumIcon, }}
                            resizeMode='contain'
                        />
                    }
                </Pressable>
            </View>
        )
    }

    const Header = () => {
        return (
            // <CenteredHeader
            //     leftIcon={<Image source={APP_IMAGE.back} style={{width:scale(24),height:scale(24)}}/>}
            //     leftPress={() => navigation.goBack()}
            //     // rightPress={MenuHandler}
            //     title={'GPT BOT'}
            //     titleStyle={styles.headerTitleStyle}
            // />
            <AppHeader
                leftIcon={<Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={APP_IMAGE.arrowBack}
                        style={globalStyles.backIcon}
                    />
                </Pressable>
                }
            // style={{ borderBottomColor: 'transparent', marginTop: insets.top }}
            />
        )
    }


    // const prompt = 'How to create youtube channel?';

    // const generateText = async () => {
    //     try {
    //         const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${KEYCHAIN.GPT_API_KEY}`,
    //             },
    //             body: JSON.stringify({
    //             // prompt,
    //             // max_tokens: 100,
    //             model: 'gpt-3.5-turbo', // Specify the model here
    //             text: prompt,

    //             }),
    //         });
    //         const data = await response.json();
    //         console.log('GPT TOKENS',data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // useEffect(() => {
    //     generateText()
    // }, [])


    return (
        <>
            <AppView isScrollEnabled={false} refreshing={false} header={<Header />} scrollStyle={{}}>

                <FlatList
                    data={chatData}
                    keyExtractor={(item, index) => index.toString()}
                    // renderItem={postItem}
                    renderItem={({ item, index }) =>
                        <ConversationItem
                            item={item}
                            index={index}
                            longpressIndex={longpressIndex}
                            setLongpressIndex={setLongpressIndex}
                            navigation={navigation}
                        />
                    }
                    contentContainerStyle={{ paddingTop: scale(12), }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={Seprator}
                />
                {InputContainer()}
            </AppView>
        </>
    );
};

export default Gptbot;

const styles = StyleSheet.create({
    headerTitleStyle: {

        fontWeight: "600",
        ...globalStyles.regularLargeText,
        fontSize: scale(20),
        // color: colors.blue1
    },
    inputContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: "space-between",
        backgroundColor: '#EFE8E6',
        // borderRadius: scale(12),
        paddingHorizontal: scale(16),
        borderTopWidth: 0.5,
        borderColor: colors.lightBlue,

    },
})