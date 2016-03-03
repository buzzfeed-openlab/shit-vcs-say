
'use strict';

import React, {
    AppRegistry,
    Component,
    Navigator,
    StatusBarIOS,
} from 'react-native';

import SimpleStore from 'react-native-simple-store';

import MainMenuScreen from './src/main-menu-screen.js';

SimpleStore.save('currentStreak', 0);

StatusBarIOS.setStyle('light-content');

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
