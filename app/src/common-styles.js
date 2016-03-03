
'use strict';

import React, {
  StyleSheet,
} from 'react-native';


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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFD',
    },
    baseText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
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
