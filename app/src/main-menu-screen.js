
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
import QuestionScreen from './question-screen.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

const titleImage = require('../assets/title-image.png');

class MainMenuScreen extends Component {
    render() {
        return (
            <View style={[CommonStyles.screenBackground, styles.mainMenuScreen]}>
                <View style={styles.titleBox}>

                    <Image
                        style={styles.titleImage}
                        source={titleImage}
                    />

                </View>
                <View style={styles.menuBox}>

                    <TouchableElement onPress={this.onStartGame.bind(this)}>
                        <View style={[CommonStyles.advanceButton, styles.startGameButton]}>
                            <Text style={CommonStyles.buttonText}>
                                How bad could it be
                            </Text>
                        </View>
                    </TouchableElement>

                </View>
            </View>
        );
    }

    onStartGame() {
        this.props.navigator.push({
            name: 'QuestionScreen',
            component: QuestionScreen,
        });
    }
}

const styles = StyleSheet.create({
    mainMenuScreen: {
        flex: 1,
    },
    titleBox: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    titleImage: {
        width: 300,
        height: 500,
    },
    titleText: {
        fontSize: 40,
    },
    menuBox: {
        alignSelf: 'flex-end',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startGameButton: {
        width: 256,
    },
});

export default MainMenuScreen;