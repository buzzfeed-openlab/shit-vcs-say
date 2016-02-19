
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
import GridView from 'react-native-grid-view';

import QuestionScreen from './question-screen.js';
import CommonStyles from './common-styles.js';
import TweetBox from './tweet-box.js';
import Toolbar from './toolbar.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class QuizSelectScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    componentWillMount() {
        SimpleStore.get('quizzes').then((quizzes) => {
            var quizArray = Object.keys(quizzes).map((q) => quizzes[q]);

            this.setState(Object.assign(this.state, { quizzes: quizArray }));
        });
    }

    render() {
        if (!this.state.quizzes) {
            return <View></View>
        }

        return (
            <View style={[CommonStyles.screenBackground, styles.quizSelectScreen]}>
                <Toolbar title={'Select A Quiz'} />

                <GridView
                    items={this.state.quizzes}
                    itemsPerRow={2}
                    renderItem={this.renderQuiz.bind(this)}
                />
            </View>
        );
    }

    renderQuiz(quiz) {
        return (
            <View style={styles.quizOptionBox} key={quiz.name}>
                <TouchableElement onPress={() => this.onSelectQuiz(quiz)}>
                    <View style={styles.quizOptionContent}>
                        <Text style={[CommonStyles.baseText, styles.quizNameText]}>
                            {quiz.name}
                        </Text>
                    </View>
                </TouchableElement>
            </View>
        );
    }

    onSelectQuiz(quiz) {
        SimpleStore.save('questions', quiz.questions).then(() => {
            this.props.navigator.push({
                name: 'QuestionScreen',
                component: QuestionScreen,
            });
        });
    }
}

const styles = StyleSheet.create({
    quizSelectScreen: {
        flex: 1,
    },
    quizOptionBox: {
        margin: 20,
    },
    quizOptionContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 128,
        height: 128,
        backgroundColor: '#FFFFFD'
    },
    quizNameText: {
        fontSize: 20
    },
});

export default QuizSelectScreen;
