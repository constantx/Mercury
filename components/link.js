/**
 * place holder module for text-only link
 * waiting for https://github.com/facebook/react-native/pull/845
 */

'use strict';

var React = require('react-native');
var GStyles = require('./global-styles.js');
var {
  StyleSheet,
  TouchableHighlight,
  Text
} = React;

var styles = StyleSheet.create({
  button: {
    flex: 1,
    fontSize: 14,
    margin: GStyles.margin,
  },
  buttonText: {
    fontFamily: GStyles.typeface,
    color: GStyles.colorTextSub,
    borderBottomWidth: 1,
    borderBottomColor: GStyles.colorTextSub
  }
});

module.exports = class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
