
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
import RNFS from 'react-native-fs';

import CommonStyles from './common-styles.js';
import QuestionScreen from './question-screen.js';
import API from './api.js';
import Constants from './constants.js';
import ArrowButton from './arrow-button.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

const titleImage = require('../assets/title-image.png');

class MainMenuScreen extends Component {
    constructor(props) {
        super(props);

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
        // a bit of a hack to make sure currentStreak is reset -------
        SimpleStore.save('currentStreak', 0);
        // -------

        var playButton = (
            <ArrowButton
                onPress={() => {this.onStartGame()}}
                text={this.state.loading ? 'Loading...' : 'How bad could it be'}
                disabled={this.state.loading}
            />
        );

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
                oldQuestions = oldQuestions || {};

                var questions = {};

                for (var i = 0; i < newQuestions.length; ++i) {
                    var q = newQuestions[i];

                    questions[q.id] = q;
                    if (oldQuestions[q.id] && oldQuestions[q.id].answered) {
                        questions[q.id].answered = true;
                    }
                }

                SimpleStore.save('questions', questions)
                .then((err) => {
                    if (err) {
                        console.log('ERROR: could not download / unpack image bundle. ', err);
                    }

                    this.setState({ loading: this.state.loading - 1 });
                });
            });
        });
    }

    loadImages() {
        API.downloadImageBundle((err, path) => {
            this.setState({ loading: this.state.loading - 1 });

            // RNFS.readDir(Constants.IMAGE_DIR)
            //   .then((result) => {
            //     console.log('GOT RESULT', result);
            // });
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
        flexDirection: 'column',
    },
    titleBox: {
        flex: 4,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    titleImage: {
        width: 300,
        height: 500,
    },
    menuBox: {
        flex: 1,
        margin: 20,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainMenuScreen;
