
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
        twitterShare: {
            'text':'Global democratized marketplace for art',
            'link':'https://artboost.com/',
        },
        options: [
            {
                name: 'Jason Calacanis',
                handle: 'Jason',
                image: require('./assets/jason.jpg'),
                link: 'http://twitter.com/jason',
                chosenText: 'Na, it wasn\'t Jason Calacanis, but who can keep track of all these white guys anyway...',
            },
            {
                name: 'Marc Andreessen',
                handle: 'pmarca',
                image: require('./assets/pmarca.jpg'),
                link: 'http://twitter.com/pmarca',
                isAuthor: true,
                chosenText: 'lol, yea...',
            },
            {
                name: 'Big Bird',
                handle: 'BigBird',
                image: require('./assets/bigbird.png'),
                link: 'http://twitter.com/bigbird',
                chosenText: 'Big Bird would never be racist!',
            },
            {
                name: 'Benedict Evans',
                handle: 'BenedictEvans',
                image: require('./assets/benedictevans.jpeg'),
                link: 'http://twitter.com/BenedictEvans',
                chosenText: 'Na, it wasn\'t Benedict Evans, but who can keep track of all these white guys anyway...',
            }
        ]
    },
    '06f9bff5-c51e-4087-ab88-djdjdjdjdj': {
        uuid: '06f9bff5-c51e-4087-ab88-djdjdjdjdj',
        text: 'The world has never been more peaceful, more wealthy, more equal, with more jobs, more education, or more opportunity. The future is bright.',
        link: 'https://twitter.com/pmarca/status/652692676752465921',
        twitterShare: {
            'text':'Global democratized marketplace for art',
            'link':'https://artboost.com/',
        },
        options: [
            {
                name: 'Elmo',
                handle: 'Elmo',
                image: require('./assets/elmo.png'),
                link: 'http://twitter.com/elmo',
                chosenText: 'Elmo would never minimize others struggles in order to validate an economic system which keeps Elmo in power!',
            },
            {
                name: 'Benedict Evans',
                handle: 'BenedictEvans',
                image: require('./assets/benedictevans.jpeg'),
                link: 'http://twitter.com/BenedictEvans',
                chosenText: 'Na, it wasn\'t Benedict Evans, but who can keep track of all these white guys anyway...',
            },
            {
                name: 'Jason Calacanis',
                handle: 'Jason',
                image: require('./assets/jason.jpg'),
                link: 'http://twitter.com/jason',
                chosenText: 'Na, it wasn\'t Jason Calacanis, but who can keep track of all these white guys anyway...',
            },
            {
                name: 'Marc Andreessen',
                handle: 'pmarca',
                image: require('./assets/pmarca.jpg'),
                link: 'http://twitter.com/pmarca',
                isAuthor: true,
                chosenText: 'lol, yea...',
            },
        ]
    },
    '06f9bff5-c51e-4087-ab88-2497bb7516c3': {
        uuid: '06f9bff5-c51e-4087-ab88-2497bb7516c3',
        text: 'I actually own three tuxedos!',
        link: 'https://twitter.com/BigBird/status/623205331305279488',
        twitterShare: {
            'text':'Global democratized marketplace for art',
            'link':'https://artboost.com/',
        },
        options: [
            {
                name: 'Jason Calacanis',
                handle: 'Jason',
                image: require('./assets/jason.jpg'),
                link: 'http://twitter.com/jason',
                chosenText: '',
            },
            {
                name: 'John Lilly',
                handle: 'johnolilly',
                image: require('./assets/johnolilly.jpeg'),
                link: 'http://twitter.com/johnolilly',
            },
            {
                name: 'Big Bird',
                handle: 'BigBird',
                image: require('./assets/bigbird.png'),
                link: 'https://twitter.com/bigbird',
                isAuthor: true,
            },
            {
                name: 'Benedict Evans',
                handle: 'BenedictEvans',
                image: require('./assets/benedictevans.jpeg'),
                link: 'https://twitter.com/benedictevans',
            }
        ]
    },
};

SimpleStore.save('questions', questions);
SimpleStore.save('currentStreak', 0);

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
