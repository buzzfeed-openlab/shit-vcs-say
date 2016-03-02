
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';

import SimpleStore from 'react-native-simple-store';

import AnswerScreen from './answer-screen';
import CommonStyles from './common-styles.js';
import TweetBox from './tweet-box.js';
import Toolbar from './toolbar.js';
import API from './api.js';
import Constants from './constants.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class QuestionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { question: null, currentStreak: null };
    }

    componentWillMount() {
        SimpleStore.get('questions').then((questions) => {
            var question = this.pickRandomQuestion(questions);
            question.options = this.shuffleArray(question.options);
            this.setState(Object.assign(this.state, { question: question }));
        });

        SimpleStore.get('currentStreak').then((currentStreak) => {
            SimpleStore.get('bestStreak').then((bestStreak) => {
                bestStreak = bestStreak || 0;
                this.setState(Object.assign(this.state, {
                    currentStreak: currentStreak,
                    bestStreak: bestStreak,
                }));
            });
        });
    }

    render() {
        if (!this.state.question) {
            return (
                <View style={CommonStyles.screenBackground}>
                </View>
            );
        }

        return (
            <View style={[CommonStyles.screenBackground, styles.gameScreen]}>
                <Toolbar navigator={this.props.navigator} title={'Who tweeted?'} currentStreak={this.state.currentStreak} bestStreak={this.state.bestStreak} />
                <Question question={this.state.question} />
                
                <Answers
                    question={this.state.question}
                    navigator={this.props.navigator}
                    selectCallback={this.onSelectedAnswer.bind(this)}/>
            </View>
        )
    }

    onSelectedAnswer(selectedOption) {
        var questionUpdate = {};
        questionUpdate[this.state.question.uuid] = Object.assign({}, this.state.question, { answered: true });

        SimpleStore.update('questions', questionUpdate).then(() => {
            this.props.navigator.push({
                name: 'AnswerScreen',
                component: (props) => {
                    return new AnswerScreen(props, this.state.question, selectedOption);
                }
            });
        });
    }

    pickRandomQuestion(questions) {
        var newQuestions = [],
            oldQuestions = [];

        for (var id in questions) {
            var questionGroup = questions[id].answered ? oldQuestions : newQuestions;
            questionGroup.push(questions[id]);
        }

        var questionGroup = newQuestions.length ? newQuestions : oldQuestions;
        return questionGroup[Math.floor(Math.random() * questionGroup.length)];
    }

    shuffleArray(arr) {
        var shuffled = [];
        while (arr.length) {
            var i = Math.floor(Math.random() * arr.length);
            shuffled.push(arr[i]);
            arr.splice(i, 1);
        }

        return shuffled;
    }
}

class Question extends Component {
    render() {
        return (
            <View style={styles.questionBox}>
                <TweetBox
                    image={{ uri: Constants.IMAGE_DIR + 'egg-1.jpeg' }}
                    name={'???'}
                    text={this.props.question.text}
                />
            </View>
        );
    }
}

class Answers extends Component {
    render() {
        return (
            <View style={styles.answerBox}>
                {this.props.question.options.map((option) => {
                    return this.renderOption(option);
                })}
            </View>
        )
    }

    renderOption(option) {
        return (
            <Option
                option={option}
                question={this.props.question}
                navigator={this.props.navigator}
                selectCallback={this.props.selectCallback}

                key={option.handle}
            />
        );
    }
}

class Option extends Component {
    render() {
        return (
            <View style={styles.optionBuffer}>
                <TouchableElement onPress={() => this.props.selectCallback(this.props.option)}>
                    <View style={styles.answerOption}>
                        <Image
                            style={CommonStyles.profilePic}
                            source={{ uri: Constants.IMAGE_DIR + this.props.option.image }}
                        />
                        <View style={styles.optionContent}>
                            <Text style={[CommonStyles.baseText, styles.optionName]}>
                                {this.props.option.name}
                            </Text>
                            <Text style={[CommonStyles.baseText, styles.optionHandle]}>
                                @{this.props.option.handle}
                            </Text>
                        </View>
                    </View>
                </TouchableElement>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameScreen: {
        flex: 1,
    },
    questionBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    answerBox: {
        flex: 2,
        margin: 20,
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    answerOption: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFD',
        padding: 8,
        flex: 1,
        borderRadius: 6,
        alignItems: 'center',
    },
    optionBuffer: {
        marginTop: 20,
    },
    optionContent: {
        flex: 1,
        margin: 8,
        flexDirection: 'column',
    },
    optionName: {
        fontSize: 14,
        textAlign: 'left',
    },
    optionHandle: {
        fontSize: 12,
        textAlign: 'left',
        color: '#8899a6',
    },
});

export default QuestionScreen;
