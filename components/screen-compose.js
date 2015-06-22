'use strict';


var React = require('react-native');
var GStyles = require('./global-styles.js');
var Button = require('./button');
var Link = require('./link');
var Footer = require('./screen-footer');
var debug = require('debug')('screen-compose');

var {
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GStyles.colorMain,
    paddingTop: 22
  },
  instructionHeading: {
    textAlign: 'center',
    color: GStyles.colorText,
    marginBottom: 5,
    fontFamily: GStyles.typeface,
    fontWeight: 'bold',
    fontSize: 24
  },
  username: {
    fontSize: 10,
    opacity: 0.5
  },
  instruction: {
    textAlign: 'center',
    color: GStyles.colorText,
    marginBottom: 5,
    fontFamily: GStyles.typeface,
    fontSize: 14
  },
  tinput: {
    height: 44 + GStyles.padder,
    borderColor: GStyles.colorBorder,
    borderWidth: 2,
    margin: GStyles.margin,
    fontFamily: GStyles.typeface,
    paddingLeft: GStyles.padder * 2,
    paddingRight: GStyles.padder * 2,
  },
});

module.exports = React.createClass({
  getInitialState () {
    return {
      buttonText: 'send'
    }
  },

  _send () {
    debug('sending to', this.state.phone);
    fetch('https://fi-sensical-co.herokuapp.com/hubot/version')
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        alert('eror in sending');
      });
  },

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>
          {this.props.username}
        </Text>

        <Text style={styles.instructionHeading}>
          Mercury is ready…
        </Text>
        <Text style={styles.instruction}>
          Enter phone # to send
        </Text>

        <TextInput
          style={styles.tinput}
          autoFocus={true}
          autoCorrect={false}
          onChangeText={(text) => this.setState({phone: text})} />

        <Button
          onPress={this._send}
          text={this.state.buttonText} />

        <Footer />
      </View>
    );
  }
});
