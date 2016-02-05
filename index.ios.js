/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const question = {
  uuid: '06f9bff5-c51e-4087-ab88-2497bb7516c3',
  text: '.@FLOTUS @funnyordie @billyeichner: I actually own three tuxedos!',
  author: {
    name: 'Big Bird',
    handle: 'BigBird'
  },
  options: [
    {
      name: 'Jason Calacanis',
      handle: 'Jason'
    },
    {
      name: 'John Lilly',
      handle: 'johnolilly'
    },
    {
      name: 'Benedict Evans',
      handle: 'BenedictEvans'
    }
  ]
}

class QuizGame extends Component {
  render() {
    return (
      <QuestionScreen/>
    );
  }
}

class QuestionScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Who tweeted?
        </Text>
        <Question question={question}/>
      </View>  
    )
  }
}

class Question extends Component {
  render() {
    return (
      <View style={styles.question}>
        <Text style={styles.tweetText}>
          {this.props.question.text}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  subInstructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('QuizGame', () => QuizGame);
