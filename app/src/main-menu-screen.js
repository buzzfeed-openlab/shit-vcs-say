
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
    NetInfo,
} from 'react-native';

import SimpleStore from 'react-native-simple-store';

import CommonStyles from './common-styles.js';
import QuestionScreen from './question-screen.js';
import API from './api.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

const titleImage = require('../assets/title-image.png');

class MainMenuScreen extends Component {
    constructor() {
        super();

        this.state = {
            loading: 0,
        }
    }

    componentWillMount() {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                // `loading` used as a semaphore, we'll load questions
                // and assets in parallel
                this.setState({ loading: 2 }, () => {
                    this.loadQuestions();
                    this.loadImages();
                });
            }
        });
    }

    render() {
        var playButton = (
            <TouchableElement onPress={this.onStartGame.bind(this)}>
                <View style={[CommonStyles.advanceButton, styles.startGameButton]}>
                    <Text style={CommonStyles.buttonText}>
                        How bad could it be
                    </Text>
                </View>
            </TouchableElement>
        );

        if (this.state.loading) {
            playButton = (
                <View style={[CommonStyles.advanceButton, styles.startGameButton]}>
                    <Text style={CommonStyles.buttonText}>
                        Loading...
                    </Text>
                </View>
            );
        }



        return (
            <View style={[CommonStyles.screenBackground, styles.mainMenuScreen]}>
                <View style={styles.titleBox}>

                    <Image
                        style={styles.titleImage}
                        source={titleImage}
                    />

                </View>
                <View style={styles.menuBox}>

                    {playButton}

                </View>
            </View>
        );
    }

    loadQuestions() {
        API.getTopQuestions((err, newQuestions) => {
            if (err || !newQuestions.length) {
                console.log('ERROR: could not query for questions. ', err);
                return this.setState({ loading: this.state.loading - 1 });
            }

            SimpleStore.get('questions').then((oldQuestions) => {
                var questions = {};

                for (var i = 0; i < newQuestions.length; ++i) {
                    var q = newQuestions[i];

                    questions[q.id] = q;
                    if (oldQuestions[q.id] && oldQuestions[q.id].answered) {
                        questions[q.id].answered = true;
                    }
                }

                SimpleStore.save('questions', questions)
                .then((err, imageDir) => {
                    if (err) {
                        console.log('ERROR: could download / unpack image bundle. ', err);
                    }

                    this.setState({ loading: this.state.loading - 1 });
                });
            });
        });
    }

    loadImages() {
        API.downloadImageBundle((err, path) => {
            this.setState({ loading: this.state.loading - 1 });
        });
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