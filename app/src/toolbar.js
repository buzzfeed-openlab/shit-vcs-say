
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
    Alert,
} from 'react-native';

import Constants from './constants.js';
import CommonStyles from './common-styles.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class Toolbar extends Component {
    render() {
        var streakStyles = [CommonStyles.largeText, styles.toolbarText, CommonStyles.textLose];
        if (this.props.currentStreak) {
            streakStyles = [CommonStyles.largeText, styles.toolbarText, CommonStyles.textWin];
        }

        var bestStreakStyles = [CommonStyles.largeText, styles.toolbarText, CommonStyles.textLose];
        if (this.props.bestStreak) {
            bestStreakStyles = [CommonStyles.largeText, styles.toolbarText, CommonStyles.textWin];
        }

        return (
            <View style={styles.toolbar}>
                <TouchableElement onPress={() => this.onExitToMenu()}>
                    <View style={styles.toolbarBackBox}>
                        <Text style={[CommonStyles.largeText, styles.toolbarBackText]}>
                            X
                        </Text>
                    </View>
                </TouchableElement>

                <View style={styles.toolbarTitleBox}>
                    <Text style={[CommonStyles.largeText, styles.toolbarTitle]}>
                        {this.props.title}
                    </Text>
                </View>

                <View style={styles.toolBarStreakBox}>
                    <Text style={streakStyles} key={1}>
                        {this.props.currentStreak}
                    </Text>
                    <Text style={[CommonStyles.largeText, styles.toolbarText]} key={2}>
                        /
                    </Text>
                    <Text style={bestStreakStyles} key={3}>
                        {this.props.bestStreak}
                    </Text>
                </View>
            </View>
        );
    }

    onExitToMenu() {
        Alert.alert(
          'To Main Menu',
          'Are you sure?',
          [
            {text: 'Stay', style: 'cancel'},
            {text: 'Leave', onPress: () => this.returnToMainMenu(), style: 'destructive'},
          ]
        )
    }

    returnToMainMenu() {
        this.props.navigator.popToTop();
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor:'#333333',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
    },
    toolbarTitleBox: {
        flex: 1,
        alignSelf: 'center',
    },
    toolbarBackBox: {
        marginLeft: Constants.BUFFER,
        width: 64,
    },
    toolBarStreakBox: {
        marginRight: Constants.BUFFER,
        width: 64,
        flexDirection: 'row',
    },
    toolbarTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFD',
    },
    toolbarBackText: {
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#FFFFFD',
    },
    toolbarBackButton: {

    },
    toolbarText: {
        fontWeight:'bold',
        color: '#FFFFFD',
        textAlign: 'right',
        paddingLeft: 8,
    },
});

export default Toolbar;
