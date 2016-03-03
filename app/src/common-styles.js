
'use strict';

import React, {
  StyleSheet,
  Dimensions,
} from 'react-native';

const dims = Dimensions.get('window');
const smallPhone = Math.min(dims.height, dims.width) < 375;

const fontSizeSmall = 12;
const fontSizeMedium = smallPhone ? 14 : 16;
const fontSizeLarge = smallPhone ? 18 : 20;

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
        fontSize: fontSizeLarge,
        fontWeight: 'bold',
        color: '#FFFFFD',
    },
    baseText: {
        fontFamily: 'Helvetica Neue',
        fontSize: fontSizeMedium,
    },
    smallText: {
        fontFamily: 'Helvetica Neue',
        fontSize: fontSizeSmall,
    },
    largeText: {
        fontFamily: 'Helvetica Neue',
        fontSize: fontSizeLarge,
    },
    profilePic: {
        width: 64,
        height: 64,
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
