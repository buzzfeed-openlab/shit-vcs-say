
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
        var streakStyles = [CommonStyles.baseText, styles.toolbarText, CommonStyles.textLose];
        if (this.props.currentStreak) {
            streakStyles = [CommonStyles.baseText, styles.toolbarText, CommonStyles.textWin];
        }

        var bestStreakStyles = [CommonStyles.baseText, styles.toolbarText, CommonStyles.textLose];
        if (this.props.bestStreak) {
            bestStreakStyles = [CommonStyles.baseText, styles.toolbarText, CommonStyles.textWin];
        }

        return (
            <View style={styles.toolbar}>
                <Text style={[CommonStyles.baseText, styles.toolbarTitle]}>
                    {this.props.title}
                </Text>

                <Text style={streakStyles}>
                    {this.props.currentStreak}
                </Text>
                <Text style={[CommonStyles.baseText, styles.toolbarText]}>
                    /
                </Text>
                <Text style={bestStreakStyles}>
                    {this.props.bestStreak}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor:'#333333',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    toolbarTitleBox: {

    },
    toolbarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1,
        paddingLeft: 20,
        color: '#FFFFFD',
    },
    toolbarText: {
        fontSize: 20,
        paddingRight: 20,
        fontWeight:'bold',
        textAlign:'right',
        color: '#FFFFFD',
    },
});

export default Toolbar;
