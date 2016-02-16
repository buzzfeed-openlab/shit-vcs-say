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
        };
    }

    render() {
        return (
            <View style={styles.answerScreen}>
                <Image
                    style={styles.answerImage}
                    source={this.state.chosenOption.isAuthor ? checkImage : crossImage}
                />
                <Text>
                    {this.state.chosenOption.chosenText}
                </Text>

                <TouchableElement onPress={this.onNextQuestion.bind(this)}>
                    <Text>
                        BLEEP BLOOP BLOP
                    </Text>
                </TouchableElement>
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
        alignItems: 'center',
    },
    answerImage: {
        width: 512,
        height: 512,
    }
});

export default AnswerScreen;
