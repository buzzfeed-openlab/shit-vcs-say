'use strict';

import React, {
    AppRegistry,
    Component,
    Navigator,
} from 'react-native';

import SimpleStore from 'react-native-simple-store';

import MainMenuScreen from './src/main-menu-screen.js';


const questions = {
    '06f9bff5-c51e-4087-ab88-1234567': {
        uuid: '06f9bff5-c51e-4087-ab88-1234567',
        text: 'Anti-colonialism has been economically catastrophic for the Indian people for decades. Why stop now?',
        link: 'http://www.bloomberg.com/news/articles/2016-02-10/marc-andreessen-pro-colonialism-tweet-riles-up-india-tech-world',
        options: [
            {
                name: 'Jason Calacanis',
                handle: 'Jason',
                image: require('./assets/jason.jpg'),
                link: 'http://twitter.com/jason',
                chosenText: '',
            },
            {
                name: 'Marc Andreessen',
                handle: 'pmarca',
                image: require('./assets/pmarca.jpg'),
                link: 'http://twitter.com/pmarca',
                isAuthor: true,
            },
            {
                name: 'Big Bird',
                handle: 'BigBird',
                image: require('./assets/bigbird.png'),
                link: 'http://twitter.com/bigbird',
                chosenText: 'lol, yea...',
            },
            {
                name: 'Benedict Evans',
                handle: 'BenedictEvans',
                image: require('./assets/benedictevans.jpeg'),
                link: 'http://twitter.com/BenedictEvans',
            }
        ]
    },
    '06f9bff5-c51e-4087-ab88-djdjdjdjdj': {
        uuid: '06f9bff5-c51e-4087-ab88-djdjdjdjdj',
        text: 'The world has never been more peaceful, more wealthy, more equal, with more jobs, more education, or more opportunity. The future is bright.',
        link: 'https://twitter.com/pmarca/status/652692676752465921',
        options: [
            {
                name: 'Elmo',
                handle: 'Elmo',
                image: require('./assets/elmo.png'),
                link: 'http://twitter.com/elmo',
            },
            {
                name: 'Benedict Evans',
                handle: 'BenedictEvans',
                image: require('./assets/benedictevans.jpeg'),
                link: 'http://twitter.com/BenedictEvans',
            },
            {
                name: 'Jason Calacanis',
                handle: 'Jason',
                image: require('./assets/jason.jpg'),
                link: 'http://twitter.com/jason',
            },
            {
                name: 'Marc Andreessen',
                handle: 'pmarca',
                image: require('./assets/pmarca.jpg'),
                link: 'http://twitter.com/pmarca',
                isAuthor: true,
            },
        ]
    },
    '06f9bff5-c51e-4087-ab88-2497bb7516c3': {
        uuid: '06f9bff5-c51e-4087-ab88-2497bb7516c3',
        text: 'I actually own three tuxedos!',
        link: 'https://twitter.com/BigBird/status/623205331305279488',
        options: [
            {
                name: 'Jason Calacanis',
                handle: 'Jason',
                image: require('./assets/jason.jpg'),
                chosenText: '',
            },
            {
                name: 'John Lilly',
                handle: 'johnolilly',
                image: require('./assets/johnolilly.jpeg'),
            },
            {
                name: 'Big Bird',
                handle: 'BigBird',
                image: require('./assets/bigbird.png'),
                chosenText: 'lol, yea...',
                isAuthor: true,
            },
            {
                name: 'Benedict Evans',
                handle: 'BenedictEvans',
                image: require('./assets/benedictevans.jpeg'),
            }
        ]
    },
};

SimpleStore.save('questions', questions);


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
