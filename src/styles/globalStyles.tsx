import React from 'react'
import { Dimensions, Platform, StyleSheet, I18nManager } from 'react-native'
import { scale } from '../utils/metrics'
import { fonts } from './fonts'
import { colors } from './colors'

export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
// export const INSETS = useSafeAreaInsets()


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backIcon: {
        width: scale(30),
        height: scale(30)
    },
    mediumIcon: {
        width: scale(24),
        height: scale(24),
    },
    topRightHeaderIcon: {
        width: scale(36),
        height: scale(36)
    },
    input: {
        margin: 0,
        padding: 0,
        paddingVertical: scale(14),
        marginTop: scale(10),
        borderWidth: 1,
        paddingHorizontal: scale(14),
        borderRadius: scale(2),
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        borderColor: colors.grey2,
        fontFamily: fonts.regularFont,
        color: colors.text

    },
    // for text
    regularSmallText: {
        fontFamily: fonts.regularFont,
        fontSize: scale(12),
        color: colors.text
    },
    regularMediumText: {
        fontFamily: fonts.regularFont,
        color: colors.text,
        fontSize: scale(14),
    },
    regularLargeText: {
        fontFamily: fonts.regularFont,
        fontSize: scale(16),
        color: colors.text
    },
    lightSmallText: {
        fontFamily: fonts.lightFont,
        fontSize: scale(12),
        color: colors.text
    },
    lightMediumText: {
        fontFamily: fonts.lightFont,
        color: colors.text,
        fontSize: scale(14),
    },
    lightLargeText: {
        fontFamily: fonts.lightFont,
        fontSize: scale(16),
        color: colors.text
    },

    standardSmallText: {
        fontFamily: fonts.standardFont,
        fontSize: scale(12),
        color: colors.text
    },
    standardMediumText: {
        fontFamily: fonts.standardFont,
        color: colors.text,
        fontSize: scale(14),
    },
    standardLargeText: {
        fontFamily: fonts.standardFont,
        fontSize: scale(16),
        color: colors.text
    },

    boldSmallText: {
        fontFamily: fonts.boldFont,
        fontSize: scale(12),
        color: colors.text
    },
    boldMediumText: {
        fontFamily: fonts.boldFont,
        color: colors.text,
        fontSize: scale(14),
    },
    boldLargeText: {
        fontFamily: fonts.boldFont,
        fontSize: scale(16),
        color: colors.text
    },

    semiBoldSmallText: {
        fontFamily: fonts.semiBoldFont,
        fontSize: scale(12),
        color: colors.text
    },
    semiBoldMediumText: {
        fontFamily: fonts.semiBoldFont,
        color: colors.text,
        fontSize: scale(14),
    },
    semiBoldLargeText: {
        fontFamily: fonts.semiBoldFont,
        fontSize: scale(16),
        color: colors.text
    },

    italicSmallText: {
        fontFamily: fonts.italicFont,
        fontSize: scale(12),
        color: colors.text
    },
    italicMediumText: {
        fontFamily: fonts.italicFont,
        color: colors.text,
        fontSize: scale(14),
    },
    italicLargeText: {
        fontFamily: fonts.italicFont,
        fontSize: scale(16),
        color: colors.text
    },

    boldItalicSmallText: {
        fontFamily: fonts.boldItalicFont,
        fontSize: scale(12),
        color: colors.text
    },
    boldItalicMediumText: {
        fontFamily: fonts.boldItalicFont,
        color: colors.text,
        fontSize: scale(14),
    },
    boldItalicLargeText: {
        fontFamily: fonts.boldItalicFont,
        fontSize: scale(16),
        color: colors.text,
    },


})