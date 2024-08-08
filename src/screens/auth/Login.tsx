import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, StatusBar } from 'react-native';
// import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/authRoutes';
import { RouteProp } from '@react-navigation/native';
import { VARIABLES } from '../../utils/variables';
import { setData } from '../../utils/storage';
// import { ToastMessage } from '../../components/toastMessage';
// import i18n from '../../translations/i18n';
import GradientView from '../../components/GradientView';
import { globalStyles } from '../../styles/globalStyles'
import { colors } from '../../styles/colors'
import AppButton from '../../components/AppButton'
import { scale } from '../../utils/metrics';
import { APP_IMAGE } from '../../utils/constants';
import ForgotPassword from '../../components/modals/ForgotPassword';
import { httpRequestAPI } from '../../apis/request';
import { RootStackParamList } from '../../navigations/routes';
import AppView from '../../components/AppView';
import i18n from '../../localization/i18n';
import { ToastMessage } from '../../components/toastMessage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'App'>;
type LoginScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>;

interface LoginProps {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
    // Define your component props here
}

interface UserInfo {
    userId: string;
    password: string;
}

const Login: React.FC<LoginProps> = (props) => {
    const { navigation } = props
    const [hidden, setHidden] = useState<boolean>(true)
    // const [userId, setUserId] = useState('')
    // const [password, setPassword] = useState('')

    const [info, setInfo] = useState<UserInfo>({
        userId: '',
        password: ''
    })

    const [otpVisible, setOtpVisible] = useState<boolean>(false)

    const [forgotPasswordVisible, setForgotPasswordVisible] = useState<boolean>(false)
    const [forgotPasswordId, setForgotPasswordId] = useState<string>('')
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const getUserId = (text: string) => {
        setInfo({
            ...info,
            userId: text
        })
    }

    const onBlurUserId = () => {
        const temp = info.userId
        setInfo({
            ...info,
            userId: temp.trim()
        })
    }

    const getPassword = (text: string) => {
        setInfo({
            ...info,
            password: text
        })
    }

    const onBlurPassword = () => {
        const temp = info.password
        setInfo({
            ...info,
            password: temp.trim()
        })
    }

    const Submit = async () => {
        if (info.userId === '') {
            ToastMessage(i18n.t('toastMessage.userId'));
            // setIsUserIdError(true)
            // setUserIdErrorMessage(i18n.t('toastMessage.userId'))
            return;
        }
        else if (info.password === '') {
            ToastMessage(i18n.t('toastMessage.password'))
            // setIsPassError(true)
            // setPasswordErrorMessage(i18n.t('toastMessage.password'))
            return
        }
        else if (info.password.length < 6) {
            ToastMessage(i18n.t('toastMessage.passwordLength'));
            // setIsPassError(true)
            // setPasswordErrorMessage(i18n.t('toastMessage.passwordLength'))
            return;
        }

        let params = {
            user: info.userId,
            password: info.password,
        }

        setLoading(true)
        const postDataResponse = await httpRequestAPI(
            'api/auth/login',
            'post',
            params,
            (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
                // You can handle the progress as needed, e.g., update a progress bar
            }
        );
        setLoading(false)
        if (postDataResponse.statusCode === 200) {
            setData('USER', JSON.stringify(postDataResponse?.data))
            setData('TOKEN', JSON.stringify(postDataResponse?.value?.token))
            VARIABLES.token = postDataResponse?.value?.token
            VARIABLES.user = postDataResponse?.data
            navigation.replace('App')

        }

        console.log('postDataResponse', postDataResponse);

        console.log('params', params);
    }

    const forgotPasswordHandler = async () => {
        // setForgotPasswordEmail('')
        if (forgotPasswordId === '') {
            ToastMessage(i18n.t('toastMessage.phoneNumber'))
            return
        }
        setForgotPasswordVisible(false)

        let params = {
            phoneNumber: forgotPasswordId,
        }
        console.log(params);

    }

    return (
        <GradientView style={styles.container}>
            <AppView customContainerStyle={{ backgroundColor: null }} scrollContainerRequired={true} isLoading={loading} isScrollEnabled={true} refreshing={false}>

                <View style={{ alignItems: 'center', marginTop: scale(30) }}>
                    <Image
                        source={APP_IMAGE.logo}
                        style={{ width: scale(200), height: scale(80) }}
                        resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.description}>{i18n.t('loginScreen.description')}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: scale(20), marginTop: scale(20) }}>
                    <Text style={{ ...globalStyles.semiBoldLargeText, color: '#fff', }}>{i18n.t('loginScreen.email')}</Text>
                    <TextInput
                        placeholder='Please enter your email/phone no.'
                        placeholderTextColor={colors.grey9}
                        style={styles.input}
                        onChangeText={getUserId}
                        onBlur={onBlurUserId}
                        value={info.userId}
                    />
                    <Text style={styles.passLabel}>{i18n.t('loginScreen.Password')}</Text>
                    <View style={{
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(12),
                        borderRadius: scale(4),
                        borderColor: '#fff'
                    }}>
                        <TextInput
                            placeholder={'Please enter your password.'}
                            placeholderTextColor={colors.grey9}
                            style={{
                                ...styles.input,
                                flex: 1,
                                borderWidth: 0,
                                // flex:1,
                                marginTop: 0,
                                // fontFamily:fonts.semiBoldFont

                            }}
                            secureTextEntry={hidden}
                            value={info.password}
                            onChangeText={getPassword}
                            onBlur={onBlurPassword}
                        />
                        <Pressable onPress={() => { setHidden(!hidden) }}>
                            <Image
                                source={hidden ? APP_IMAGE.eyeOff : APP_IMAGE.eyeOn}
                                style={styles.eyeImg}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.forgotContainer}>
                    <Pressable
                        hitSlop={20}
                        onPress={() => {
                            setForgotPasswordVisible(true)
                        }}
                    >
                        <Text style={styles.forgotLabel}>{i18n.t('loginScreen.ForgotPassword')}</Text>
                    </Pressable>
                </View>

            </AppView>
            <AppButton
                text={i18n.t('login')}
                onPress={() => {
                    navigation.replace('App'),
                        StatusBar.setBarStyle('dark-content')
                }}
                // onPress={Submit}
                style={{ margin: scale(20), marginBottom: 0, backgroundColor: '#fff', }}
                textStyle={{ color: '#000' }}
            />
            <View style={styles.registerContainer}>
                <Text style={{ ...globalStyles.regularMediumText, color: '#fff' }}>{i18n.t('loginScreen.footerOne')}</Text>
                <Pressable onPress={() => {
                    navigation.navigate('Register')
                    // VARIABLES.entryType = 'register'
                }}>
                    <Text style={{
                        ...globalStyles.semiBoldMediumText,
                        color: colors.white,
                        textDecorationLine: 'underline'
                    }}>{i18n.t('loginScreen.footerTwo')}</Text>
                </Pressable>
            </View>
            <ForgotPassword
                visible={forgotPasswordVisible}
                setVisible={setForgotPasswordVisible}
                forgotEmail={forgotPasswordId}
                setForgotEmail={setForgotPasswordId}
                onPress={forgotPasswordHandler}
            />

        </GradientView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // backgroundColor:colors.secondary,
        // justifyContent:'center',
        // alignItems:'center'
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(30)
    },
    description: {
        ...globalStyles.regularMediumText,
        color: '#fff',
        textAlign: 'center',
        marginHorizontal: 30,
        marginTop: 20
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: scale(12),
        color: '#fff',
        borderColor: "#fff",
        marginTop: scale(12),
        paddingStart: scale(12)
    },
    forgotLabel: {
        ...globalStyles.semiBoldMediumText,
        textDecorationLine: 'underline',
        color: '#fff'
    },
    forgotContainer: {
        alignItems: 'flex-end',
        marginHorizontal: scale(20),
        marginTop: scale(12)
    },
    eyeImg: {
        marginHorizontal: scale(14),
        width: scale(20),
        height: scale(20)
    },
    passLabel: {
        ...globalStyles.semiBoldLargeText,
        color: '#fff',
        marginTop: scale(20)
    },
})