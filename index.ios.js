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
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
 TouchableElement = TouchableNativeFeedback;
}

const question = {
  uuid: '06f9bff5-c51e-4087-ab88-2497bb7516c3',
  text: '.@FLOTUS @funnyordie @billyeichner: I actually own three tuxedos!',
  options: [
    {
      name: 'Big Bird',
      handle: 'BigBird',
      image: './assets/bigbird.png',
      isAuthor: true,
    },
    {
      name: 'Jason Calacanis',
      handle: 'Jason',
      image: './assets/jason.jpg',
    },
    {
      name: 'John Lilly',
      handle: 'johnolilly',
      image: './assets/johnolilly.jpeg',
    },
    {
      name: 'Benedict Evans',
      handle: 'BenedictEvans',
      image: './assets/benedictevans.jpeg',
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

        <View style={styles.answerRow}>

          <Option
            name={this.props.options[0].name}
            handle={this.props.options[0].handle}
            image={require('./assets/bigbird.png')}
          />

          <Option
            name={this.props.options[1].name}
            handle={this.props.options[1].handle}
            image={require('./assets/jason.jpg')}
          />

        </View>

        <View style={styles.answerRow}>

          <Option
            name={this.props.options[2].name}
            handle={this.props.options[2].handle}
            image={require('./assets/johnolilly.jpeg')}
          />

          <Option
            name={this.props.options[3].name}
            handle={this.props.options[3].handle}
            image={require('./assets/benedictevans.jpeg')}
          />

        </View>

      </View>
    )
  }
}

class Option extends Component {
  render() {
    return (
      <TouchableElement>
        <View style={styles.answerOption}>
          <View>
            <Image
              style={styles.profilePic}
              source={this.props.image}
            />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionName}>
              {this.props.name}
            </Text>
            <Text style={styles.optionHandle}>
              @{this.props.handle}
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
  questionContent: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
  },
  answerBox: {
    flex: 2,
    backgroundColor:'#ebeef0',
    flexDirection: 'column',
  },
  answerRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  answerOption: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionContent: {
    flex:1,
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
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
  optionName: {
    fontSize: 16,
    textAlign: 'center',
  },
  optionHandle: {
    fontSize: 12,
    textAlign: 'center',
  },
  profilePic: {
    width: 64,
    height: 64,
  },
});

AppRegistry.registerComponent('QuizGame', () => QuizGame);
