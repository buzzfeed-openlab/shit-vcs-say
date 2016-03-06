
'use strict';

import React, {
    StyleSheet,
    Dimensions,
} from 'react-native';

import Constants from './constants.js';

const CommonStyles = StyleSheet.create({
    screenBackground: {
        backgroundColor:'#333333',
    },
    advanceButton: {
        backgroundColor: '#27ae60',
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 6,
    },
    buttonText: {
        fontFamily: 'Helvetica Neue',
        fontSize: Constants.FONT_SIZE_LARGE,
        fontWeight: 'bold',
        color: '#FFFFFD',
    },
    baseText: {
        fontFamily: 'Helvetica Neue',
        fontSize: Constants.FONT_SIZE_MEDIUM,
    },
    smallText: {
        fontFamily: 'Helvetica Neue',
        fontSize: Constants.FONT_SIZE_SMALL,
    },
    largeText: {
        fontFamily: 'Helvetica Neue',
        fontSize: Constants.FONT_SIZE_LARGE,
    },
    profilePic: {
        width: Constants.PROFILE_SIZE,
        height: Constants.PROFILE_SIZE,
        borderRadius: 6,
    },
    textWin: {
        color: '#27ae60'
    },
    textLose: {
        color: '#e74c3c'
    },
});

export default CommonStyles;
