'use strict';


var debug = require('debug')('screen-settings');
var React = require('react-native');
var GStyles = require('./global-styles.js');
var Button = require('./button');
var Footer = require('./screen-footer');
var config = require('./config');
var BTN_STATE_DELAY = 1000;
var AppActions = require('../actions/AppActions');

var {
  AsyncStorage,
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
  },
  instructions: {
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
      buttonText: this._getDefaultButtonText(),
      username: this.props.username
    }
  },


  _buildJSONResumeURL: function () {
    return [config.resumeRoot, this.state.username, '.json'].join('');
  },


  _clearSettings () {
    AppActions.removeKeys(['username', 'displayName']);

    return;
  },


  _getDefaultButtonText: function () {
    return 'save';
  },


  _saveSetting () {
    if (!this.state.username) {
      this._clearSettings();
      return;
    }

    debug('saving username', this.state.username);

    this.setState({buttonText: 'saving…'});

    fetch(this._buildJSONResumeURL())
      .then((response) => response.text())
      .then((responseText) => {
        var blob = JSON.parse(responseText);
        debug('responseText.basics.name', blob.basics.name);
        if (blob.basics && blob.basics.name) {
          AppActions.saveKeys([
            ['username', this.state.username],
            ['displayName', blob.basics.name]
          ]);
        }
      })
      .then(() => {
        this.setState({buttonText: 'saved'});
      })
      .then(() => {
        setTimeout(() => {
          this.props.navigator.pop();
        }, BTN_STATE_DELAY);
      })
      .catch((error) => {
        debug('error', error.message);
      })
      .done();
  },


  _onReset () {
    this.setState({
      username: '',
      buttonText: 'cleared'
    }).then(() => {
      setTimeout(() => {
        this.setState({
          buttonText: this._getDefaultButtonText()
        });
      }, BTN_STATE_DELAY);
    });
  },


  _handleChangedText (text) {
    this.setState({
      username: text
    });

    // if we already have a username, reset the text for the save button
    if (this.state.username) {
      this.setState({
        'buttonText': this._getDefaultButtonText()
      });
    }
  },


  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Please enter your JSON Resume username
        </Text>

        <TextInput
          value={this.state.username}
          style={styles.tinput}
          autoCorrect={false}
          autoFocus={true}
          clearButtonMode="while-editing"
          onChangeText={this._handleChangedText}
          onSubmitEditing={this._saveSetting}
        />

        <Button style={GStyles.button} onPress={this._saveSetting} text={this.state.buttonText} />

        <Footer
          activeScreen='settings'
          navigator={this.props.navigator} />
      </View>
    );
  }
});
