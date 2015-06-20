'use strict';


var React = require('react-native');
var GStyles = require('./global-styles.js');
var Button = require('./button');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GStyles.colorMain,
  },
  instructionHeading: {
    textAlign: 'center',
    color: GStyles.colorText,
    marginBottom: 5,
    fontFamily: GStyles.typeface,
    fontWeight: 'bold',
    fontSize: 24
  },
  instruction: {
    textAlign: 'center',
    color: GStyles.colorText,
    marginBottom: 5,
    fontFamily: GStyles.typeface
  },
  tinput: {
    height: 44 + GStyles.padder,
    borderColor: GStyles.colorBorder,
    borderWidth: 2,
    margin: GStyles.margin,
    fontFamily: GStyles.typeface,
    paddingLeft: GStyles.padder * 2,
    paddingRight: GStyles.padder * 2,
    textAlign: 'center'
  },
});

module.exports = React.createClass({
  getInitialState () {
    return {
      buttonText: 'send'
    }
  },

  _send () {

  },

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructionHeading}>
          Mercury is ready…
        </Text>
        <Text style={styles.instructions}>
          Enter phone # to send
        </Text>

        <TextInput
          style={styles.tinput}
          onChangeText={(text) => this.setState({input: text})}
        />

        <Button style={GStyles.button} onPress={this._send} text={this.state.buttonText} />
      </View>
    );
  }
});
