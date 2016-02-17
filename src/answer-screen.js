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

import QuestionScreen from './question-screen.js';
import CommonStyles from './common-styles.js';
import TweetBox from './tweet-box.js';

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
        if (!this.state.answer) {
            return (
                <View style={CommonStyles.screenBackground}>
                </View>
            );
        }
        return (
            <View style={[CommonStyles.screenBackground, styles.answerScreen]}>
                <View style={styles.centerContainer}>
                    <Image
                        style={styles.answerImage}
                        source={this.state.chosenOption.isAuthor ? checkImage : crossImage}
                    />
                </View>

                <View style={styles.answerTweetBox}>
                    <TweetBox
                        image={this.state.answer.image}
                        name={this.state.answer.name}
                        handle={this.state.answer.handle}
                        text={this.state.question.text}
                    />
                </View>

                <View style={styles.centerContainer}>
                    <TouchableElement onPress={this.onNextQuestion.bind(this)}>
                        <View style={CommonStyles.advanceButton}>
                            <Text style={CommonStyles.buttonText}>
                                Next
                            </Text>
                        </View>
                    </TouchableElement>
                </View>
            </View>
        )
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
    answerTweetBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    answerImage: {
        width: 256,
        height: 256,
    },
});

export default AnswerScreen;
