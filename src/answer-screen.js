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

                <View style={styles.tweetBox}>
                    <View>
                        <Image
                            style={styles.profilePic}
                            source={this.state.answer.image}
                        />
                    </View>

                    <View style={styles.tweetContent}>
                        <Text style={styles.tweetName}>
                            {this.state.answer.name}
                        </Text>

                        <Text style={styles.tweetHandle}>
                            @{this.state.answer.handle}
                        </Text>

                        <Text style={styles.tweetText}>
                            {this.state.question.text}
                        </Text>
                    </View>
                </View>

                <View style={styles.centerContainer}>
                    <TouchableElement onPress={this.onNextQuestion.bind(this)}>
                        <Text>
                            Next
                        </Text>
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
    centerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    answerImage: {
        width: 256,
        height: 256,
    },
    tweetBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    tweetContent: {
        flex: 1,
        padding: 8,
        flexDirection: 'column',
    },
    tweetName: {
        textAlign: 'left',
        fontSize: 20,
    },
    tweetHandle: {
        fontSize: 12,
    },
    tweetText: {
        fontSize: 16,
        textAlign: 'left',
        marginTop: 10,
    },
    profilePic: {
        width: 64,
        height: 64,
    },
});

export default AnswerScreen;
