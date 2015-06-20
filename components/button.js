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
    backgroundColor: GStyles.colorBorder,
    margin: GStyles.margin,
    paddingTop: GStyles.padder,
    paddingRight: GStyles.padder * 2,
    paddingBottom: GStyles.padder,
    paddingLeft: GStyles.padder * 2
  },
  buttonText: {
    fontFamily: GStyles.typeface,
    color: GStyles.colorTextLight
  }
});

module.exports = class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        activeOpacity='0.8'>
        <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
      </TouchableHighlight>
    );
  }
}
