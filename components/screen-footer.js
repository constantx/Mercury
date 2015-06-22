'use strict';


var debug = require('debug')('screen-footer');
var React = require('react-native');
var GStyles = require('./global-styles.js');
var {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} = React;

var styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GStyles.padder * 2,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});

class ComposeButton extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('image!icon-compose')}
        />
      </TouchableOpacity>
    )
  }
}

class SettingsButton extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('image!icon-settings')}
        />
      </TouchableOpacity>
    )
  }
}

module.exports = React.createClass({
  _gotoSettings () {
    debug('_gotoSettings', this.props.navigator);
    this.props.navigator.push({ id: 'settings' });
  },

  _gotoCompose () {
    debug('_gotoCompose', this.props.navigator);
    this.props.navigator.pop();
  },

  render() {
    debug('this.props.activeScreen', this.props.activeScreen);
    return (
      <View style={styles.footer}>
        { this.props.activeScreen === 'compose'
          ? <SettingsButton onPress={this._gotoSettings} />
          : <ComposeButton onPress={this._gotoCompose} /> }
      </View>
    )
  }
});
