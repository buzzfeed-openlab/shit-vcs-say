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
  Image,
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
      <View style={styles.gameScreen}>
        <Question question={question} />
        <Answers options={question.options}/>
      </View>
    )
  }
}

class Question extends Component {
  render() {
    return (
      <View style={styles.questionBox}>
        <View>
          <Image
            style={styles.profilePic}
            source={require('./assets/egg-profile.jpeg')}
          />
        </View>

        <View style={styles.questionContent}>
          <Text style={styles.headText}>
            ???
          </Text>
          <Text style={styles.bodyText}>
            {this.props.question.text}
          </Text>
        </View>
      </View>
    )
  }
}

class Answers extends Component {
  render() {
    return (
      <View style={styles.answerBox}>
        <Text>
          Bleep bloop blop
        </Text>
      </View>
    )
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
  },
  questionContent: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
  },
  answerBox: {
    flex: 2,
    backgroundColor:'#ebeef0',
  },
  headText: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  bodyText: {
    fontSize: 16,
    textAlign: 'left',
  },
  profilePic: {
    width: 64,
    height: 64,
  },
});

AppRegistry.registerComponent('QuizGame', () => QuizGame);
