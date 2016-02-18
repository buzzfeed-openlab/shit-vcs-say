
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
            answer: null,
            answeredCorrect: chosenOption.isAuthor == true,
        };
    }

    componentWillMount() {
        SimpleStore.get('attemptsRemaining').then((attempts) => {
            var attemptsRemaining = attempts;

            if (!this.state.chosenOption.isAuthor) {
                attemptsRemaining -= 1;
                SimpleStore.save('attemptsRemaining', attemptsRemaining);
            }

            this.setState(Object.assign(this.state, { attemptsRemaining: attemptsRemaining }));
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
        // early out if not initialized
        if (!this.state.answer || this.state.attemptsRemaining == null) {
            return (
                <View style={CommonStyles.screenBackground}>
                </View>
            );
        }

        var answeredCorrect = this.state.answeredCorrect;

        var screenStyles = [CommonStyles.screenBackground, styles.answerScreen];
        screenStyles.push(answeredCorrect ? CommonStyles.screenSuccess : CommonStyles.screenFailure);

        return (
            <View style={screenStyles}>

                <Toolbar attemptsRemaining={this.state.attemptsRemaining}/>

                <View style={[styles.centerContainer, styles.contextBox]}>

                        <Image
                            style={styles.answerImage}
                            source={answeredCorrect ? checkImage : crossImage}
                        />

                        <View style={styles.contextTextBox}>
                            <Text style={[CommonStyles.baseText]}>
                                {this.state.chosenOption.chosenText}
                            </Text>
                        </View>

                </View>

                <View style={styles.answerTweetBox}>
                    <TweetBox
                        image={this.state.answer.image}
                        name={this.state.answer.name}
                        handle={this.state.answer.handle}
                        text={this.state.question.text}
                        profileUrl={this.state.answer.link}
                    />
                </View>

                <View style={styles.centerContainer}>

                    <View style={styles.actionOptionsBox}>

                        <TouchableElement onPress={this.onNextQuestion.bind(this)}>
                            <View style={[CommonStyles.advanceButton, styles.nextButton]}>
                                <Text style={CommonStyles.buttonText}>
                                    Next >
                                </Text>
                            </View>
                        </TouchableElement>

                    </View>

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

const styles = StyleSheet.create({
    answerScreen: {
        flex: 1,
    },
    contextBox: {
        backgroundColor: '#FFFFFD',
        flexDirection: 'row',
        padding: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    contextTextBox: {
        flexDirection: 'column',
        flex: 1,
    },
    answerTweetBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    centerContainer: {
        flex: 1,
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
        width: 335,
    },
});

export default AnswerScreen;
