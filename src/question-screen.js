
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
        this.state = { question: null };
    }

    componentWillMount() {
        SimpleStore.get('questions').then((questions) => {
            for (var id in questions) {
                var question = questions[id];

                if (!question.answered) {
                    this.setState(Object.assign(this.state, { question: question }));
                    break;
                }
            }
        });

        SimpleStore.get('attemptsRemaining').then((attempts) => {
            this.setState(Object.assign(this.state, { attemptsRemaining: attempts }));
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
                <Toolbar attemptsRemaining={this.state.attemptsRemaining}/>
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
                        <Text style={[CommonStyles.baseFont, styles.optionName]}>
                            {this.props.option.name}
                        </Text>
                        <Text style={[CommonStyles.baseFont, styles.optionHandle]}>
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
        flexDirection: 'column',
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
