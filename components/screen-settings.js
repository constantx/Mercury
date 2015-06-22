'use strict';


var debug = require('debug')('screen-settings');
var React = require('react-native');
var GStyles = require('./global-styles.js');
var Button = require('./button');
var Footer = require('./screen-footer');

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
      username: null
    }
  },

  componentDidMount: function () {
    AsyncStorage.getItem('username')
      .then((value) => {
        debug('settings componentDidMount value', value);
        if (value !== null){
          this.setState({
            username: value
          });
        }
      })
      .catch((error) => alert('AsyncStorage error: ' + error.message))
      .done();
  },

  _getDefaultButtonText: function () {
    return 'save';
  },

  _saveSetting () {
    if (!this.state.username) {
      return
    }

    debug('savesetting username is', this.state.username);

    AsyncStorage
      .setItem('username', this.state.username)
      .then(() => {
        this.setState({buttonText: 'saved'});
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
          What is JSON Resume username?
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
