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

class MainMenuScreen extends Component {
    render() {
        return (
            <View style={[CommonStyles.screenBackground, styles.mainMenuScreen]}>
                <View style={styles.titleBox}>

                    <Text style={[CommonStyles.baseFont, styles.titleText]}>
                        Shit VCs Say
                    </Text>

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
        alignItems: 'center',
    },
    titleBox: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 40,
    },
    menuBox: {
        flex: 1,
        justifyContent: 'center',
    },
    startGameButton: {
        width: 256,
    },
});

export default MainMenuScreen;