'use strict';

import React, {
    AppRegistry,
    Component,
    Navigator,
} from 'react-native';

import MainMenuScreen from './src/main-menu-screen.js';

class QuizGame extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: 'MainMenuScreen', component: MainMenuScreen}}
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
