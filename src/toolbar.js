
'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';

import CommonStyles from './common-styles.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class Toolbar extends Component {
    render() {
        return (
            <View style={styles.toolbar}>
                <Text style={[CommonStyles.baseText, styles.toolbarTitle]}>
                    {this.props.title}
                </Text>

                <Text style={[CommonStyles.baseText, styles.toolbarText]}>
                    Guesses left: {this.props.attemptsRemaining}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor:'#FFFFFD',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    toolbarTitleBox: {

    },
    toolbarTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1,
        paddingLeft: 20,
    },
    toolbarText: {
        paddingRight: 20,
        fontWeight:'bold',
        textAlign:'right',
    },
});

export default Toolbar;
