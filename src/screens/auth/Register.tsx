import { Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import GradientView from '../../components/GradientView'
import { scale } from '../../utils/metrics'
import { APP_IMAGE } from '../../utils/constants'
import { globalStyles } from '../../styles/globalStyles'
import AppView from '../../components/AppView'
import { colors } from '../../styles/colors'
import AppButton from '../../components/AppButton'
import { VARIABLES, regEmail } from '../../utils/variables'
// import OptVerify from '../../components/modals/otpVerify'
import { setData } from '../../utils/storage'
import { httpRequestAPI } from '../../apis/request'
import { RouteProp } from '@react-navigation/native';

import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/routes'
import { AuthStackParamList } from '../../navigations/authRoutes'
import i18n from '../../localization/i18n'
import { ToastMessage } from '../../components/toastMessage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'App'>;
type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>;

interface RegisterProps {
    navigation: RegisterScreenNavigationProp;
    route: RegisterScreenRouteProp;
    // Define your component props here
}

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string,
    password: string
}

export default function Register(props: RegisterProps) {
    const { navigation } = props
    // const role = props.route.params.role
    // console.log(role);
    const [hidden, setHidden] = useState(true)
    const [code, setCode] = useState('');
    const [otpVisible, setOtpVisible] = useState(false)
    const [otpError, setOtpError] = useState(false)
    const [otpErrorMessage, setOtpErrorMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const [info, setInfo] = useState<UserInfo>({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        // countryCode: countryCode[0],
        // partnerPhoneNumber:'',
        // partnerCountryCode:countryCode[1]

    })

    const getName = (text: string) => {
        setInfo({
            ...info,
            name: text
        })
    }

    const onBlurName = () => {
        const temp = info.name
        setInfo({
            ...info,
            name: temp.trim()
        })
    }

    const getEmail = (text: string) => {
        setInfo({
            ...info,
            email: text
        })
    }

    const onBlurEmail = () => {
        const temp = info.email
        setInfo({
            ...info,
            email: temp.trim()
        })
    }

    const getPhoneNumber = (text: string) => {
        setInfo({
            ...info,
            phoneNumber: text
        })
    }

    const onBlurPhoneNumber = () => {
        const temp = info.phoneNumber
        setInfo({
            ...info,
            phoneNumber: temp.trim()
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
        if (info.name === '') {
            ToastMessage(i18n.t('toastMessage.username'));
            // setIsUserIdError(true)
            // setUserIdErrorMessage(i18n.t('toastMessage.userId'))
            return;
        }
        else if (info.email === '') {
            ToastMessage(i18n.t('toastMessage.email'))
            // setIsPassError(true)
            // setPasswordErrorMessage(i18n.t('toastMessage.password'))
            return
        }
        else if (regEmail.test(info.email) === false) {
            ToastMessage(i18n.t('toastMessage.validEmail'));
            // setIsEmailError(true)
            // setEmailErrorMessage(i18n.t('toastMessage.validEmail'))
        }
        else if (info.phoneNumber === '') {
            ToastMessage(i18n.t('toastMessage.phoneNumber'))
            // setIsPassError(true)
            // setPasswordErrorMessage(i18n.t('toastMessage.password'))
            return
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
            userName: info.name,
            email: info.email,
            phoneNumber: info.phoneNumber,
            password: info.password,
        }

        console.log('params', params);

        setLoading(true)
        const postDataResponse = await httpRequestAPI(
            'api/auth/signup',
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

        // setOtpVisible(true)


    }

    const OtpVerifyHandler = async () => {
        if (code.length !== 5) {
            // ToastMessage('Please enter all the inputs')
            // setOtpError(true)
            // setOtpErrorMessage(i18n.t('toastMessage.allInputs'))
            return
        }


        let params = {
            otp: code,
            type: 'login'
        }
        setOtpVisible(false)

    }

    const resendOtpHandler = async () => {
        setOtpVisible(false)

        // setLoading(true)
        // const result = await API('user/auth/resendOTP','PUT')
        // console.log('successfully otp sent',result);
        // if(result.status===200){
        //     setLoading(false)
        //     if(result?.body?.statusCode===201 || result?.body?.statusCode===200){
        //         // setOtpVisible(true)
        //         ToastMessage(i18n.t('toastMessage.otpResend'))
        //         setCode('')
        //     }else{
        //         ToastMessage(result?.body?.message)
        //     }
        // }

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
                        <Text style={styles.description}>{i18n.t('registerScreen.description')}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: scale(20), marginTop: scale(20) }}>
                    <Text style={styles.label}>{i18n.t('registerScreen.name')}</Text>
                    <TextInput
                        placeholder='Please enter your username.'
                        placeholderTextColor={colors.grey9}
                        style={styles.input}
                        onChangeText={getName}
                        onBlur={onBlurName}
                        value={info.name}
                        autoCapitalize='none'
                        // onSubmitEditing={() => alert('hhh')}
                        returnKeyType='done'
                    />
                    <Text style={{ ...styles.label, marginTop: scale(20) }}>{i18n.t('registerScreen.email')}</Text>
                    <TextInput
                        placeholder='Please enter your email'
                        placeholderTextColor={colors.grey9}
                        keyboardType='email-address'
                        style={styles.input}
                        onChangeText={getEmail}
                        onBlur={onBlurEmail}
                        value={info.email}
                    />
                    <Text style={{ ...styles.label, marginTop: scale(20) }}>{i18n.t('registerScreen.phoneNumber')}</Text>
                    <TextInput
                        placeholder='Please enter your phone no.'
                        placeholderTextColor={colors.grey9}
                        keyboardType='numeric'
                        style={styles.input}
                        onChangeText={getPhoneNumber}
                        onBlur={onBlurPhoneNumber}
                        value={info.phoneNumber}
                    />
                    <Text style={{ ...styles.label, marginTop: scale(20) }}>{i18n.t('registerScreen.Password')}</Text>
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

            </AppView>
            <AppButton
                text={i18n.t('signUp')}
                onPress={() => {
                    navigation.navigate('App'),
                        StatusBar.setBarStyle('dark-content')
                }}
                // onPress={()=>{setOtpVisible(true)}}
                style={{ margin: scale(20), marginBottom: 0, backgroundColor: '#fff', }}
                textStyle={{ color: '#000' }}
            />
            <View style={styles.registerContainer}>
                <Text style={{ ...globalStyles.regularMediumText, color: '#fff' }}>{i18n.t('registerScreen.footerOne')}</Text>
                <Pressable
                    onPress={() => {
                        navigation.goBack()
                        // VARIABLES.entryType = 'login'
                    }}
                    style={{}}
                >
                    <Text style={{
                        ...globalStyles.regularMediumText,
                        color: colors.white,
                        textDecorationLine: 'underline'
                    }}>{i18n.t('registerScreen.footerTwo')}</Text>
                </Pressable>
            </View>
            {/* <OptVerify
                code={code}
                setCode={setCode}
                onPress={OtpVerifyHandler}
                visible={otpVisible}
                setVisible={setOtpVisible}
                resendOtp={resendOtpHandler}
                otpError={otpError}
                setOtpError={setOtpError}
                otpErrorMessage={otpErrorMessage}
            /> */}
        </GradientView>
    )
}

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
    label: {
        ...globalStyles.semiBoldLargeText,
        color: '#fff',
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
    eyeImg: {
        marginHorizontal: scale(14),
        width: scale(20),
        height: scale(20)
    }
})