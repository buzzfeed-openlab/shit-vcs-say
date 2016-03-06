
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
import ArrowButton from './arrow-button.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

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
                bestStreak = bestStreak || 0;

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

                <View style={styles.contentBox}>
                    <View style={[styles.tweetBox]}>
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
                    <View style={[styles.streakBox]}>
      
                        <StreakViewer
                            answeredCorrectly={this.state.chosenOption.isAuthor == true}
                            streakLength={this.state.currentStreak}
                            oldStreak={this.state.oldStreak}
                            bestStreak={this.state.bestStreak}
                            chosenText={this.state.chosenOption.chosenText}
                        />
                    </View>
                </View>

                <View style={[styles.buttonBox]}>
                    <ArrowButton
                        onPress={() => {this.onNextQuestion()}}
                        text={'Next'}
                    />
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
                <View style={styles.badgeBox}>
                    <Text style={[CommonStyles.textWin, styles.badgeWin]}>
                        ✓
                    </Text>
                </View>
            );

            contentBox = (
                <View style={[styles.resultBoxContent, styles.resultBoxContentWin]}>
                    <View style={styles.scoreBoxWin}>
                        <Text style={[CommonStyles.largeText, styles.streakWinText]}>
                            Streak
                        </Text>
                        <Text style={[CommonStyles.baseText, styles.streakWinNumber]}>
                            {this.props.streakLength}
                        </Text>
                    </View>
                    <View style={styles.scoreBoxWin}>
                        <Text style={[CommonStyles.largeText, styles.streakWinText]}>
                            Best
                        </Text>
                        <Text style={[CommonStyles.baseText, styles.streakWinNumber]}>
                            {this.props.bestStreak}
                        </Text>
                    </View>
                </View>
            );

        } else {
            var streakBrokenText = 'No streak for you!';
            if (this.props.oldStreak) {
                streakBrokenText = 'You broke your streak!';
            }

            contentBox = (
                <View style={[styles.resultBoxContent]}>
                    <Text style={[CommonStyles.largeText, styles.streakLoseText]}>
                        {streakBrokenText}
                    </Text>
                    <Text style={[CommonStyles.baseText]}>
                        {this.props.chosenText}
                    </Text>
                </View>
            );
        }

        return (
            <View style={[styles.streakViewer]}>
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
        marginLeft: Constants.BUFFER,
        marginRight: Constants.BUFFER,
        borderRadius: 6,
    },
    streakWinText: {
        fontWeight: 'bold',
        color: '#27ae60',
        paddingBottom: 0,
        textAlign: 'center',
    },
    streakWinNumber: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#27ae60',
        textAlign: 'center',
    },
    streakLoseText: {
        fontWeight: 'bold',
        color: '#e74c3c',
        paddingBottom: 10,
    },
    resultBoxContent: {
        flex: 1,
        flexDirection: 'column',
        padding: Constants.BUFFER,
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
    badgeBox: {
        paddingTop: 10,
        backgroundColor: 'transparent',
    },
    badgeWin: {
        fontSize: 100,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    contentBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    tweetBox: {
        margin: Constants.BUFFER,
    },
    streakBox: {
    },
    buttonBox: {
        alignItems: 'center',
        marginBottom: Constants.BUFFER,
        marginRight: 30,
        marginLeft: 20,
    },

});

export default AnswerScreen;
