
'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
    Linking,
} from 'react-native';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class TweetBox extends Component {
    render() {
        var handleText = null;
        if (this.props.handle) {
            handleText = (
                <Text style={styles.tweetHandle}>
                    @{this.props.handle}
                </Text>
            )
        }

        var imageElement = null;
        if (this.props.profileUrl) {
            imageElement = (
                <TouchableElement onPress={() => Linking.openURL(this.props.profileUrl)}>
                    <Image
                        style={styles.profilePic}
                        source={this.props.image}
                    />
                </TouchableElement>
            )
        } else {
            imageElement = (
                <Image
                    style={styles.profilePic}
                    source={this.props.image}
                />
            )
        }

        return (
            <View style={styles.tweetBox}>
                <View style={styles.tweetHeader}>
                    {imageElement}

                    <View style={styles.tweetHeaderText}>
                        <Text style={styles.tweetName}>
                            {this.props.name}
                        </Text>

                        {handleText}

                    </View>
                </View>

                <View style={styles.tweetContent}>
                    <Text style={styles.tweetText}>
                        {this.props.text}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tweetBox: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#FFFFFD',
    },
    tweetHeader: {
        height: 64,
        flexDirection: 'row',
    },
    tweetHeaderText: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    tweetContent: {
        padding: 8,
        flexDirection: 'column',
    },
    tweetName: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: 'Helvetica Neue',
    },
    tweetHandle: {
        fontSize: 12,
        color: '#8899a6',
        fontFamily: 'Helvetica Neue',
    },
    tweetText: {
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'Helvetica Neue',
    },
    profilePic: {
        width: 64,
        height: 64,
    },
});

export default TweetBox;
