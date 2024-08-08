import { Image, Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import ScrollContainer from '../ScrollContainer';
import { scale } from '../../utils/metrics';
import { globalStyles } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
// import i18n from '../../translations/i18n';
import { colors } from '../../styles/colors';
import AppButton from '../AppButton';
import i18n from '../../localization/i18n';

interface Props {
    // Define your component props here
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    onPress: () => void,
    forgotEmail: string,
    setForgotEmail: React.Dispatch<React.SetStateAction<string>>
}

export default function ForgotPassword(props: Props) {
    const { visible, setVisible, onPress, forgotEmail, setForgotEmail } = props

    const sendLinkHandler = () => {
        // setVisible(false)
        onPress()
    }

    const getPhoneNumber = (text: string) => {
        setForgotEmail(text)
    }

    const onBlurPhoneNumber = () => {
        const temp = forgotEmail.trim();
        setForgotEmail(temp)
    };

    return (
        <Modal
            avoidKeyboard
            //  testID={'modal'}
            isVisible={visible}
            //  useNativeDriverForBackdrop
            //  animationInTiming={800}
            onBackdropPress={() => {
                setVisible(false);
            }}
            style={{
                margin: 0,
                flex: 1,
                // justifyContent:'flex-end'
            }}
        >
            <ScrollContainer scrollContainerRequired={true} scrollStyle={{ justifyContent: 'center', }} isScrollEnabled={true} refreshing={false}>
                <View style={{ backgroundColor: '#fff', padding: scale(20), borderRadius: scale(16), marginHorizontal: scale(20), }}>
                    <View style={styles.headerContainer}>
                        <Text style={{
                            ...globalStyles.semiBoldLargeText,
                            fontSize: scale(22),
                        }}>{i18n.t('popup.forgotPassword.header')}</Text>
                        <Pressable onPress={() => setVisible(false)}>
                            <Image
                                source={APP_IMAGE.cancel}
                                style={{ width: scale(26), height: scale(26) }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                        <Text style={styles.tagline}>{i18n.t('popup.forgotPassword.tagline')}</Text>
                    </View>
                    <TextInput
                        placeholder={i18n.t('placeholder.phone')}
                        placeholderTextColor={colors.grey2}
                        style={{ ...globalStyles.input, marginVertical: scale(24) }}
                        keyboardType='numeric'
                        value={forgotEmail}
                        onChangeText={getPhoneNumber}
                        onBlur={onBlurPhoneNumber}
                    />
                    <AppButton
                        text={i18n.t('action.sendLink')}
                        onPress={sendLinkHandler}
                        style={{ backgroundColor: colors.primary, borderRadius: scale(6) }}
                        textStyle={{ color: '#fff' }}
                    />
                </View>
            </ScrollContainer>
        </Modal>
    )
}

const styles = StyleSheet.create({
    tagline: {
        ...globalStyles.regularLargeText,
        marginTop: scale(14),
        lineHeight: 23,
        textAlign: 'left'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})