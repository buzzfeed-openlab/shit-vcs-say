
'use strict';

import React, {
  StyleSheet,
} from 'react-native';


const CommonStyles = StyleSheet.create({
    screenBackground: {
        backgroundColor:'#ECF1EF',
    },
    screenSuccess: {
        backgroundColor: '#b3de69'
    },
    screenFailure: {
        backgroundColor: '#fb8072',
    },
    advanceButton: {
        backgroundColor: '#1E90FF',
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFD'
    },
    baseText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
    },
});

export default CommonStyles;