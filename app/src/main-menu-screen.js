
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
            <TouchableElement onPress={this.onStartGame.bind(this)}>
                <View style={styles.button}>
                    <View style={[CommonStyles.advanceButton, styles.buttonBox]} >
                        <Text style={CommonStyles.buttonText}>
                            How bad could it be
                        </Text>
                    </View>
                    <View style={styles.buttonArrow} />
                </View>
            </TouchableElement>
        );

        if (this.state.loading) {
            playButton = (
                <View>
                    <View style={[CommonStyles.advanceButton, styles.startGameButton]}>
                        <Text style={CommonStyles.buttonText}>
                            Loading...
                        </Text>
                    </View>
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
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        backgroundColor: 'transparent',
    },
    buttonBox: {
        height: 32,
        width: 256,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    buttonArrow: {
        position: 'absolute',
        right: -12,
        top: 2,
        transform: [
            {rotate: '135deg'}
        ],

        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 27,
        borderTopWidth: 27,
        borderRightColor: 'transparent',
        borderTopColor: '#27ae60',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 8,

        // borderRadius: 3,


        // width: 0,
        // height: 0,
        // backgroundColor: 'transparent',
        // borderStyle: 'solid',
        // borderLeftWidth: 16,
        // borderRightWidth: 16,
        // borderBottomWidth: 18,
        // borderLeftColor: 'transparent',
        // borderRightColor: 'transparent',
        // borderBottomColor: '#FFFFFD',
    },
});

export default MainMenuScreen;
