'use strict';


var React = require('react-native');
var GStyles = require('./global-styles.js');

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
  render: () => {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Enter phone #
        </Text>
        <TextInput
          style={styles.tinput}
          onChangeText={(text) => this.setState({input: text})}
        />
      </View>
    );
  }
});
