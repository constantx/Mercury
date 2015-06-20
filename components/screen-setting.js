'use strict';


var React = require('react-native');
var GStyles = require('./global-styles.js');
var Button = require('./button');

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

  _getDefaultButtonText: function () {
    return 'save';
  },

  _saveSetting () {
    if (!this.state.username) {
      return
    }

    console.log('username is', this.state.username);

    AsyncStorage
      .setItem('username', this.state.username)
      .then(() => {
        this.setState({buttonText: 'saved'});
      });
  },

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          What is JSON Resume username?
        </Text>
        <TextInput
          style={styles.tinput}
          autoFocus={true}
          clearButtonMode="while-editing"
          onChangeText={(text) => this.setState({
            username: text,
            buttonText: this._getDefaultButtonText()
          })}
          onSubmitEditing={this._saveSetting}
        />
        <Button style={GStyles.button} onPress={this._saveSetting} text={this.state.buttonText} />
      </View>
    );
  }
});
