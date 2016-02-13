'use strict';

import React, {
    AppRegistry,
    Component,
    Navigator,
} from 'react-native';

import QuestionScreen from './src/question-screen.js';

class QuizGame extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: 'QuestionScreen', component: QuestionScreen}}
                configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                        if (route.component) {
                                return React.createElement(route.component, { navigator });
                        }
                }}
            />
        );
    }
}

AppRegistry.registerComponent('QuizGame', () => QuizGame);
