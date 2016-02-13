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

import QuestionScreen from './src/question-screen.js';


class QuizGame extends Component {
  render() {
    return (
      <QuestionScreen/>
    );
  }
}

AppRegistry.registerComponent('QuizGame', () => QuizGame);
