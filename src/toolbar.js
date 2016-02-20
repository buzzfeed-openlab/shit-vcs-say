
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
} from 'react-native';

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

class Toolbar extends Component {
    render() {
        return (
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor:'#FFFFFD',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    toolbarTitleBox: {

    },
    toolbarTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1,
        paddingLeft: 20,
    },
    toolbarText: {
        paddingRight: 20,
        fontWeight:'bold',
        textAlign:'right',
    },
});

export default Toolbar;
