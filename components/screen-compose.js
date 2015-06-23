'use strict';


var debug = require('debug')('screen-compose');
var React = require('react-native');
var router = require('./router');
var GStyles = require('./global-styles.js');
var Button = require('./button');
var Link = require('./link');
var Footer = require('./screen-footer');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
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
      buttonText: this._getDefaultButtonText(),
      isSending: false
    }
  },


  _gotoSettings () {
    this.props.navigator.push(router['settings']);
  },


  _getDefaultButtonText: function () {
    return 'send';
  },


  _buildURL () {
    var endpoint = 'https://fi-sensical-co.herokuapp.com/mercury/sms'
    var query = [
      `username=${this.props.username}`,
      `displayName=${this.props.displayName}`,
      `phone=${this.state.phone}`,
    ].join('&');

    return `${endpoint}?${query}`;
  },


  _send () {
    debug('sending to', this.state.phone);

    debug('built url', this.props);

    if (this.state.isSending) return;

    if (!this.state.phone) return;

    if (!this.props.username) {
      this._gotoSettings();
      return;
    }

    // set sending state
    this.setState({
      isSending: true,
      buttonText: 'sending…'
    });

    debug('built url', this._buildURL());

    fetch(this._buildURL())
      .then((response) => response.text())
      .then((responseText) => {
        debug('success');

        this.setState({
          buttonText: 'done!'
        });

        // reset button text after a second
        setTimeout(() => {
          this.setState({
            buttonText: this._getDefaultButtonText(),
            phone: '',
            isSending: false
          });
        }, 1000);
      })
      .catch((error) => {
        debug('error', err.message);
      });
  },


  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>
          {this.props.username} {this.props.displayName ? `(${this.props.displayName})` : '' }
        </Text>

        <Text style={styles.instructionHeading}>
          Mercury is ready…
        </Text>
        <Text style={styles.instruction}>
          Enter phone # to send to
        </Text>

        <TextInput
          value={this.state.phone}
          style={styles.tinput}
          autoFocus={true}
          autoCorrect={false}
          onChangeText={(text) => this.setState({phone: text})} />

        <Button
          onPress={this._send}
          text={this.state.buttonText} />

        <Footer
          activeScreen='compose'
          navigator={this.props.navigator} />
      </View>
    );
  }
});
