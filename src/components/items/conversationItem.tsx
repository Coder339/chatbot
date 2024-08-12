import { StyleSheet, Text, View, Image, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent, Pressable, Alert, Animated, Linking } from 'react-native'
import React, { Dispatch, SetStateAction, useRef, useState, } from 'react'
import { SCREEN_WIDTH, globalStyles } from '../../styles/globalStyles';
// import Video from 'react-native-video';
import { APP_IMAGE } from '../../utils/constants';
import { VARIABLES } from '../../utils/variables';
import { colors } from '../../styles/colors';
import { scale } from '../../utils/metrics';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList, TabStackParamList } from '../../navigations/appRoutes';
import moment from 'moment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const imageWidth = scale(140)
const imageHeight = scale(140)

type NavigationProp = NativeStackNavigationProp<TabStackParamList, 'Gptbot'>;

interface ItemProps {
    item: {
        type: string,
        message: string,
        direction: string,
        // sender:string              // when JSON including sender id
        // type_message:string,
    },
    index: number,
    longpressIndex: number | null,
    setLongpressIndex: Dispatch<SetStateAction<number | null>>,
    navigation: NavigationProp

}

const Item: React.FC<ItemProps> = ({ item, index, longpressIndex, setLongpressIndex, navigation }) => {

    // const [longpressIndex, setLongpressIndex] = useState<null | number>(null)


    const [audioPlaying, setAudioPlaying] = useState(false)
    const [isAudioPaused, setIsAudioPaused] = useState(true)
    const [imageLoading, setImageLoading] = useState(false)
    const [image, setImage] = useState('')



    // const loadFile=async(uri)=>{
    //     const path = RNFS.DocumentDirectoryPath+`/CloserImages/${uri}`

    //     const exists = await RNFS.exists(path);

    //     if (exists) {
    //         // console.log('YES EXISTS-ANDrs', path);
    //         setImage('file://'+path);
    //         // return `file://${path}`;
    //     } else {
    //         // Return the original URL if the file doesn't exist
    //         setImage(AWS_URL_S3 + `${process.env.NODE_ENV}/chat/` + item.message)
    //         // return AWS_URL_S3 + `${process.env.NODE_ENV}/chat/` + item.message;
    //     }

    // }

    // const onStartPlay = async (item) => {
    //     // setLoadingAudio(true);

    //     setIsAudioPaused(false)
    //     console.log('audio playing==?',item);
    //     const path = `${AWS_URL_S3}${item?.message}`;
    //     const msg = await audioRecorderPlayer.startPlayer(path);
    //     console.log('audio playing not==?',path);
    //     // setTimeout(() => {
    //     //     setLoadingAudio(false);
    //     // }, 2000);
    //     audioRecorderPlayer.setVolume(1.0);
    //     console.log(msg);
    //     audioRecorderPlayer.addPlayBackListener(e => {
    //         // console.log('eeeeeeeeeeeeeee', e);
    //         if (e.currentPosition === e.duration) {
    //             console.log('finished');
    //             setAudioPlaying(false);
    //             audioRecorderPlayer.stopPlayer();
    //             setIsAudioPaused(true)
    //         } else {
    //             // setIsAudioPaused(true)
    //         }
    //     });
    // };

    // const onPausePlay = async e => {
    //     setIsAudioPaused(true);
    //     await audioRecorderPlayer.pausePlayer();
    // };

    // const handleResume = async () => {
    //     setIsAudioPaused(false);
    //     await audioRecorderPlayer.resumePlayer();
    // };



    // {loadFile(item.message)}
    // console.log('IMAGE-FS',await loadFile(item.message));
    // loadFile(item.message)

    // const loadImage = async()=>{
    //     await loadFile(item.message)
    // }
    // useEffect(() => {
    //     loadImage()
    // }, [])

    return (
        <Pressable
            style={{
                paddingHorizontal: scale(16),
                alignItems: item?.direction === 'right' ? 'flex-end' : 'flex-start',
                // alignItems: item?.sender === VARIABLES?.user?._id ? 'flex-end' : 'flex-start',
                // backgroundColor: 'red',

            }}
        // onLongPress={() => {

        //     setHook(!hook)
        //     setIsReactionEnabled(true)
        //     setChatId(item?._id)
        //     ReactNativeHapticFeedback.trigger("impactHeavy", options);

        //     handlePresentEmojiModalPress()
        // }}
        // onPress={()=>{
        //     if(item?.quotedMessage){
        //         handlePress(item?.quotedMessage?._id)
        //     }
        // }}
        >
            <View style={{
                marginStart: item?.direction !== 'right' ? 0 : scale(50),
                marginEnd: item?.direction === 'right' ? 0 : scale(50),
                // backgroundColor: 'blue'
            }}>
                <View
                    style={[
                        // styles.chatText,
                        {
                            backgroundColor: item?.direction === 'right' ? colors.primary : colors.lightBlue,
                            paddingHorizontal: item.type === 'message' || item.type === 'link' || item.type === 'doc' || item.type === 'audio' ? scale(16) : 0,
                            paddingVertical: item.type === 'message' || item.type === 'link' || item.type === 'doc' || item.type === 'audio' ? scale(12) : 0,
                            borderRadius: item.type === 'message' || item.type === 'link' || item.type === 'doc' || item.type === 'audio' ? scale(14) : scale(10),
                            // borderBottomEndRadius: item?.direction === 'right' && (item.type === 'message' || item.type === 'link' || item.type === 'doc' || item.type==='audio') ? 0 : scale(14),
                            // borderBottomStartRadius: item?.direction === 'right' && (item.type === 'message' || item.type === 'link' || item.type === 'doc' || item.type==='audio') ? 0 : scale(14),
                            borderBottomEndRadius: item?.direction === 'right' ? 0 : scale(14),
                            borderTopStartRadius: item?.direction !== 'right' ? 0 : scale(14),

                        },

                    ]}>
                    {/* {item?.quotedMessage && 
                                <QuotedMessage 
                                    quoted={item?.quotedMessage} 
                                    messageUserId={item?.senderId}
                                />
                                } */}
                    {item.type === 'message' ?
                        <Text style={[
                            { ...globalStyles.regularMediumText, lineHeight: 21 },
                            { color: item.direction === 'right' ? '#fff' : '#000' }
                        ]}>
                            {item.message}
                        </Text>
                        :
                        <>
                            {item.type === 'sticker' ?
                                <>
                                </>
                                // <Pressable onPress={() => {
                                //     // setViewImage(AWS_URL_S3 + item.message)
                                //     // setVisibleImage(true)
                                // }
                                // }
                                // onLongPress={() => {
                                //     // setIsReply(true),
                                //     //     setRepliedText(item.message)
                                //     setHook(!hook)
                                //     setIsReactionEnabled(true)
                                //     setChatId(item?._id)
                                //     ReactNativeHapticFeedback.trigger("impactHeavy", options);

                                //     handlePresentEmojiModalPress()
                                // }}
                                // >
                                //     <Image
                                //         source={item.message}
                                //         style={{
                                //             width: scale(120),
                                //             height: scale(100),
                                //             borderRadius: scale(10)
                                //         }}
                                //         resizeMode='contain'
                                //     />
                                // </Pressable>
                                :
                                <>
                                    {item.type === 'emoji' ?
                                        <Pressable onPress={() => {
                                            // setViewImage(AWS_URL_S3 + item.message)
                                            // setVisibleImage(true)
                                        }
                                        }
                                        // onLongPress={() => {
                                        //     // setIsReply(true),
                                        //     //     setRepliedText(item.message)
                                        //     setHook(!hook)
                                        //     setIsReactionEnabled(true)
                                        //     setChatId(item?._id)
                                        //     ReactNativeHapticFeedback.trigger("impactHeavy", options);

                                        //     handlePresentEmojiModalPress()
                                        // }}
                                        >
                                            <Text style={{ fontSize: 100 }}>
                                                {item.message}
                                            </Text>
                                        </Pressable>
                                        :
                                        <>
                                            {item.type === 'location' ?
                                                <Pressable
                                                // onPress={()=>openMaps(item.lat,item.long)} 
                                                // style={{
                                                //     backgroundColor: item?.sender === VARIABLES?.user?._id ? strokeColor : themeColor,
                                                //     padding:4,
                                                //     borderRadius: scale(10),
                                                //     borderBottomEndRadius: item.sender === VARIABLES?.user?._id  ? 0 : scale(14),
                                                //     borderBottomStartRadius: item.sender !== VARIABLES?.user?._id  ? 0 : scale(14)
                                                // }}

                                                >
                                                    {/* <ImageBackground
                                                source={{uri: mapApi}}
                                                style={{width:200,height:100,}}
                                                borderRadius={scale(10)}
                                                >
                                                <LocationPinMapSvg />
                                            </ImageBackground> */}
                                                </Pressable>
                                                :
                                                <>
                                                    {item.type === 'link' ?
                                                        <Pressable onPress={() => {
                                                            Linking.openURL(item.message);
                                                        }}
                                                            hitSlop={20}
                                                        // onLongPress={() => {
                                                        //     // setIsReply(true),
                                                        //     //     setRepliedText(item.message)
                                                        //     setHook(!hook)
                                                        //     setIsReactionEnabled(true)
                                                        //     setChatId(item?._id)
                                                        //     ReactNativeHapticFeedback.trigger("impactHeavy", options);

                                                        //     handlePresentEmojiModalPress()
                                                        // }}
                                                        >
                                                            {/* <Text style={[styles.message, { ...globalStyles.regularMediumText,lineHeight:21 }]}>
                                                {item.message}
                                            </Text> */}
                                                        </Pressable>
                                                        :
                                                        <>
                                                            {item.type === 'doc' ?
                                                                <Pressable
                                                                // style={{flexDirection:'row'}}
                                                                // onPress={()=>{
                                                                // Linking.openURL(AWS_URL_S3+item.message);
                                                                // }}
                                                                // onLongPress={() => {
                                                                //     // setIsReply(true),
                                                                //     //     setRepliedText(item.message)
                                                                //     setIsReactionEnabled(true)
                                                                //     setChatId(item?._id)
                                                                //     ReactNativeHapticFeedback.trigger("impactHeavy", options);

                                                                //     handlePresentEmojiModalPress()
                                                                // }}
                                                                >
                                                                    {/* <View>
                                                <Text style={[styles.message, { ...globalStyles.italicMediumText,lineHeight:21 }]}>
                                                    {'Document'}
                                                </Text>
                                                <Text style={{...globalStyles.semiBoldMediumText,width:120}}>{item?.docName}</Text>
                                            </View>
                                            <View style={{backgroundColor:'lightgrey',padding:scale(12),marginStart:12}}>
                                                <Text style={{...globalStyles.regularSmallText,}}>Doc</Text>
                                                <Text style={{...globalStyles.regularSmallText,marginTop:4}}>File</Text>
                                            </View> */}
                                                                </Pressable>
                                                                :
                                                                <>
                                                                    {item.type === 'audio' ?
                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            {/* <Pressable 
                                            onPress={()=>{
                                                // setIsAudioPaused(!isAudioPaused)
                                                if(!audioPlaying){
                                                    setAudioPlaying(true);
                                                    onStartPlay(item)
                                                }else{
                                                    if(isAudioPaused){
                                                        handleResume()
                                                    }else{
                                                        onPausePlay()
                                                    }
                                                }
                                            }}
                                            onLongPress={() => {
                                                // setIsReply(true),
                                                //     setRepliedText(item.message)
                                                setHook(!hook)
                                                setIsReactionEnabled(true)
                                                setChatId(item?._id)
                                                ReactNativeHapticFeedback.trigger("impactHeavy", options);
                        
                                                handlePresentEmojiModalPress()
                                            }}
                                            >

                                                {isAudioPaused ?
                                                <Image
                                                    source={APP_IMAGE.mediaPlayIcon}
                                                    style={{width:scale(36),height:scale(36),borderRadius:scale(25)}}
                                                />
                                                :
                                                <Image
                                                    source={APP_IMAGE.mediaPauseIcon}
                                                    style={{width:scale(36),height:scale(36),borderRadius:scale(25)}}
                                                />
                                                }
                                            </Pressable>
                                            <View style={{marginStart:scale(12)}}>
                                                <Text style={{...globalStyles.italicMediumText}}>Audio File</Text>
                                                <Text style={{...globalStyles.regularMediumText}}>{item.recordTime}</Text>
                                            </View> */}
                                                                        </View>
                                                                        :
                                                                        <Pressable
                                                                        // onPress={() => {
                                                                        //     // setViewImage(AWS_URL_S3+`${process.env.NODE_ENV}/chat/` + item.message)
                                                                        //     setViewImage( item?.status ? item.message : image)
                                                                        //     setVisibleImage(true)
                                                                        // }
                                                                        // }
                                                                        // onLongPress={() => {
                                                                        //     // setIsReply(true),
                                                                        //     //     setRepliedText(item.message)
                                                                        //     setHook(!hook)
                                                                        //     setIsReactionEnabled(true)
                                                                        //     setChatId(item?._id)
                                                                        //     ReactNativeHapticFeedback.trigger("impactHeavy", options);

                                                                        //     handlePresentEmojiModalPress()
                                                                        // }}
                                                                        >
                                                                            {/* {imageLoading && <ActivityIndicator size={20} style={styles.loader}/>} */}
                                                                            <Image
                                                                                // source={{ uri:  item?.status ? item.message : image}}
                                                                                source={{ uri: item.message }}
                                                                                style={{
                                                                                    width: imageWidth,
                                                                                    height: imageHeight,
                                                                                    borderRadius: scale(10)
                                                                                }}
                                                                                resizeMode='cover'
                                                                                onLoadStart={() => setImageLoading(true)}
                                                                                onLoadEnd={() => setImageLoading(false)}

                                                                            />
                                                                        </Pressable>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </View>
                <View style={{
                    marginTop: scale(4),
                    flexDirection: "row",
                    // alignItems: 'flex-end',
                    // justifyContent: 'space-between', // uncommen if using stickers in row
                    justifyContent: item.direction !== 'right' ? 'flex-end' : 'flex-start',

                    // backgroundColor: 'yellow',
                }}>
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {Stickers()}
                            </View> */}
                    <Text style={{
                        ...globalStyles.regularSmallText,
                        fontSize: scale(12),
                        opacity: 0.6
                    }}>
                        {/* {moment(item?.createdAt).format("hh:mm A")} */}
                        5:06 pm
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const ConversationItem: React.FC<ItemProps> = ({ item, index, longpressIndex, setLongpressIndex, navigation }) => {
    return (
        <Item
            item={item}
            index={index}
            longpressIndex={longpressIndex}
            setLongpressIndex={setLongpressIndex}
            navigation={navigation}
        />
    )
}

export default ConversationItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 14,
        // marginBottom:4
        flexDirection: 'row',
        paddingVertical: scale(8)
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})