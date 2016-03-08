
'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import CommonStyles from './common-styles.js';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class Button extends Component {
    render() {
        var button = (
            <TouchableElement onPress={this.props.onPress}>
                <View style={styles.button}>
                    <View style={[CommonStyles.advanceButton, styles.buttonBox]} key={0} >
                        <Text style={CommonStyles.buttonText}>
                            {this.props.text}
                        </Text>
                    </View>
                </View>
            </TouchableElement>
        );

        if (this.props.disabled) {
            button = (
                <View>
                    <View style={[CommonStyles.advanceButton, styles.buttonBoxDisabled]}>
                        <Text style={CommonStyles.buttonText}>
                            {this.props.text}
                        </Text>
                    </View>
                </View>
            );
        }

        return button;
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
    },
    buttonBox: {
        height: 32,
        width: 256,
        borderRadius: 6,
    },
    buttonBoxDisabled: {
        height: 32,
        width: 256,
        borderRadius: 6,
    },
});

export default Button;
