
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

import Constants from './constants.js';
import CommonStyles from './common-styles.js';

import Clipboard from 'react-native-clipboard';

var KDSocialShare = require('NativeModules').KDSocialShare;

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

const twitterShareImage = require('../assets/twitter-share.png');
const linkShareImage = require('../assets/link-share.png');

class TweetBox extends Component {
    render() {
        // optional handle text
        var handleText = null;
        if (this.props.handle) {
            handleText = (
                <Text style={[CommonStyles.smallText, styles.tweetHandle]}>
                    @{this.props.handle}
                </Text>
            )
        }

        // image optionally linkable
        var imageElement = (
            <Image
                style={CommonStyles.profilePic}
                source={this.props.image}
            />
        );
        if (this.props.profileUrl) {
            imageElement = (
                <TouchableElement onPress={() => Linking.openURL(this.props.profileUrl)}>
                    {imageElement}
                </TouchableElement>
            );
        }

        // share buttons are optional
        var shareButtons = null;
        if (this.props.twitterShare) {
            shareButtons = (
                <View style={styles.shareButtonBox}>
                    <TouchableElement style={styles.shareButtonTwitter} onPress={() => this.onTweet()}>
                        <Image
                            style={styles.shareImageTwitter}
                            source={twitterShareImage}
                        />
                    </TouchableElement>

                    <TouchableElement style={styles.shareButtonLink} onPress={() => this.onLink()}>
                        <Image
                            style={styles.shareImageLink}
                            source={linkShareImage}
                        />
                    </TouchableElement>
                </View>
            );
        }

        // tweet box content
        var content = (
            <View>
                <View style={styles.tweetHeader}>
                    {imageElement}

                    <View style={styles.tweetHeaderText}>
                        <Text style={[CommonStyles.largeText, styles.tweetName]}>
                            {this.props.name}
                        </Text>

                        {handleText}

                    </View>
                </View>

                <View style={styles.tweetContent}>
                    <Text style={[CommonStyles.baseText, styles.tweetText]}>
                        {this.props.text}
                    </Text>
                </View>

                {shareButtons}
            </View>
        );

        // tweet box optionally linkable
        if (this.props.tweetUrl) {
            content = (
                <TouchableElement style={styles.tweetBox} onPress={() => Linking.openURL(this.props.tweetUrl)}>
                    {content}
                </TouchableElement>
            );
        } else {
            content = (
                <View style={styles.tweetBox}>
                    {content}
                </View>
            );
        }

        return content;
    }

    onTweet() {
        KDSocialShare.tweet(this.props.twitterShare, (results) => {
            console.log('bleep bloop: ',results);
        });
    }

    onLink() {
        console.log(this.props.tweetUrl);
        Clipboard.set(this.props.tweetUrl);
    }
}

const styles = StyleSheet.create({
    tweetBox: {
        flex: 1,
        flexDirection: 'column',
        padding: Constants.BUFFER,
        backgroundColor: '#FFFFFD',
        borderRadius: 6,
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
    },
    tweetHandle: {
        color: '#8899a6',
    },
    tweetText: {
        textAlign: 'left',
    },
    shareButtonBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    shareButtonTwitter: {
        flex: 1,
        flexDirection: 'column',
        height: 32,
        backgroundColor: '#55acee',

    },
    shareImageTwitter: {
        width: 32,
        height: 32,
    },
    shareButtonLink: {
        flexDirection: 'column',
        flex: 1,
        height: 32,
        backgroundColor: '#666666'
    },
    shareImageLink: {
        width: 85,
        height: 32,
    },
});

export default TweetBox;
