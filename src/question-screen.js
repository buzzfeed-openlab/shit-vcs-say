
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

import GridView from 'react-native-grid-view';
import SimpleStore from 'react-native-simple-store';

import AnswerScreen from './answer-screen';
import CommonStyles from './common-styles.js';
import TweetBox from './tweet-box.js';
import Toolbar from './toolbar.js';

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
            this.setState(Object.assign(this.state, { question: question }));
        });

        SimpleStore.get('currentStreak').then((currentStreak) => {
            this.setState(Object.assign(this.state, { currentStreak: currentStreak }));
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
                <Toolbar currentStreak={this.state.currentStreak} />
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
}

class Question extends Component {
    render() {
        return (
            <View style={styles.questionBox}>
                <TweetBox
                    image={require('../assets/egg-profile.jpeg')}
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

                <GridView
                    scrollEnabled={false}

                    items={this.props.question.options}
                    itemsPerRow={2}
                    renderItem={this.renderOption.bind(this)}
                />

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
            <TouchableElement onPress={() => this.props.selectCallback(this.props.option)}>
                <View style={styles.answerOption}>
                    <Image
                        style={styles.profilePic}
                        source={this.props.option.image}
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
        padding: 20,
    },
    answerBox: {
        flex: 2,
        margin: 20,
        flexDirection: 'column',
        backgroundColor: '#FFFFFD',
    },
    answerOption: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFD',
    },
    optionContent: {
        padding: 8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    optionName: {
        fontSize: 16,
        textAlign: 'center',
    },
    optionHandle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#8899a6',
    },
    profilePic: {
        width: 64,
        height: 64,
    },
});

export default QuestionScreen;
