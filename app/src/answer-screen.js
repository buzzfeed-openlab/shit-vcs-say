
'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import SimpleStore from 'react-native-simple-store';

import QuestionScreen from './question-screen.js';
import CommonStyles from './common-styles.js';
import TweetBox from './tweet-box.js';
import Toolbar from './toolbar.js';
import Constants from './constants.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

const crossImage = require('../assets/cross-mark.png');
const checkImage = require('../assets/check-mark.png');

class AnswerScreen extends Component {
    constructor(props, question, chosenOption) {
        super(props);

        this.state = {
            question: question,
            chosenOption: chosenOption,
            answer: null
        };
    }

    componentWillMount() {
        SimpleStore.get('currentStreak').then((currentStreak) => {
            SimpleStore.get('bestStreak').then((bestStreak) => {
                var oldStreak = currentStreak;

                if (!this.state.chosenOption.isAuthor) {
                    currentStreak = 0;
                } else {
                    currentStreak += 1;
                }

                if (bestStreak < currentStreak) {
                    bestStreak = currentStreak;
                    SimpleStore.save('bestStreak', bestStreak);
                }

                SimpleStore.save('oldStreak', oldStreak);
                SimpleStore.save('currentStreak', currentStreak);

                this.setState(Object.assign(this.state, {
                    oldStreak: oldStreak,
                    currentStreak: currentStreak,
                    bestStreak: bestStreak,
                }));
            });
        });

        // find the correct answer
        for (var i = 0; i < this.state.question.options.length; ++i) {
            var option = this.state.question.options[i];

            if (option.isAuthor) {
                this.setState(Object.assign(this.state, { answer: option }));
                break;
            }
        }
    }

    render() {
        if (!this.state.answer || this.state.currentStreak == null) {
            return (
                <View style={CommonStyles.screenBackground}>
                </View>
            );
        }

        return (
            <View style={[CommonStyles.screenBackground, styles.answerScreen]}>

                <Toolbar navigator={this.props.navigator} currentStreak={this.state.currentStreak} bestStreak={this.state.bestStreak} />

                <View style={styles.answerTweetBox}>
                    <TweetBox
                        image={{ uri: Constants.IMAGE_DIR + this.state.answer.image }}
                        name={this.state.answer.name}
                        handle={this.state.answer.handle}
                        text={this.state.question.text}
                        profileUrl={this.state.answer.link}
                        tweetUrl={this.state.question.link}
                        twitterShare={this.state.question.twittershare}
                    />
                </View>

                <StreakViewer
                    answeredCorrectly={this.state.chosenOption.isAuthor == true}
                    streakLength={this.state.currentStreak}
                    oldStreak={this.state.oldStreak}
                    bestStreak={this.state.bestStreak}
                    chosenText={this.state.chosenOption.chosenText}
                />


                    <View style={[styles.centerContainer, styles.actionOptionsBox]}>

                        <TouchableElement onPress={this.onNextQuestion.bind(this)}>
                            <View style={[CommonStyles.advanceButton, styles.nextButton]}>
                                <Text style={CommonStyles.buttonText}>
                                    Next >
                                </Text>
                            </View>
                        </TouchableElement>

                    </View>

            </View>
        );
    }

    onNextQuestion() {

        this.props.navigator.push({
            name: 'QuestionScreen',
            component: QuestionScreen,
        });
    }
}

class StreakViewer extends Component {
    render() {
        var contentBox = null;
        var answerImage = null;

        if (this.props.answeredCorrectly) {
            answerImage = (
                <Image
                    style={styles.answerImage}
                    source={checkImage}
                />
            );

            contentBox = (
                <View style={[styles.resultBoxContent, styles.resultBoxContentWin]}>
                    <View style={styles.scoreBoxWin}>
                        <Text style={[CommonStyles.baseText, styles.streakWinText]}>
                            Streak
                        </Text>
                        <Text style={[CommonStyles.baseText, styles.streakWinText]}>
                            {this.props.streakLength}
                        </Text>
                    </View>
                    <View style={styles.scoreBoxWin}>
                        <Text style={[CommonStyles.baseText, styles.streakWinText]}>
                            Best
                        </Text>
                        <Text style={[CommonStyles.baseText, styles.streakWinText]}>
                            {this.props.bestStreak}
                        </Text>
                    </View>
                </View>
            );

        } else {
            // answerImage = crossImage;

            var streakBrokenText = 'No streak for you!';
            if (this.props.oldStreak) {
                streakBrokenText = 'You broke your streak!';
            }

            contentBox = (
                <View style={[styles.resultBoxContent]}>
                    <Text style={[CommonStyles.baseText, styles.streakLoseText]}>
                        {streakBrokenText}
                    </Text>
                    <Text style={[CommonStyles.baseText]}>
                        {this.props.chosenText}
                    </Text>
                </View>
            );
        }

        return (
            <View style={[styles.centerContainer, styles.streakViewer]}>
                {answerImage}
                {contentBox}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    answerScreen: {
        flex: 1,
    },
    streakViewer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFD',
        margin: 20,
        borderRadius: 6,
    },
    streakWinText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27ae60',
        paddingBottom: 10,
        textAlign: 'center',
    },
    streakLoseText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e74c3c',
        paddingBottom: 10,
    },
    resultBoxContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    resultBoxContentWin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    scoreBoxWin: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerTweetBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionOptionsBox: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    answerImage: {
        width: 128,
        height: 128,
    },
    nextButton: {
        width: 331,
    },
});

export default AnswerScreen;
