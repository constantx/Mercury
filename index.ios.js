/**
 * Mercury iOS
 * https://github.com/constantx/mercury
 *
 * Sample JSON
 * http://registry.jsonresume.org/constantx.json
 * http://registry.jsonresume.org/thomasdavis.json
 *
 * Sample Business Card Link
 * http://registry.jsonresume.org/constantx?theme=business-card
 */
'use strict';


window.MercuryDebug = require('debug');
var debug = require('debug')('index.ios');
var React = require('react-native');
var flux = require('flux');
var router = require('./components/router');
var GStyles = require('./components/global-styles.js');
var ScreenSettings = require('./components/screen-settings.js')
var ScreenCompose = require('./components/screen-compose.js');
var {
  AppRegistry,
  AsyncStorage,
  Navigator
} = React;


var Mercury = React.createClass({

  getInitialState () {
    return {
      initialRouteId: 'compose'
    }
  },

  _renderScene (route, navigator) {
    debug('renderScene route', route);

    switch (route.id) {
      case 'compose':
        return <ScreenCompose
          navigator={navigator} />;
      case 'settings':
        return <ScreenSettings
          navigator={navigator} />
      default:
        return;
    }
  },

  render () {
    return (
      <Navigator
        initialRoute={router['compose']}
        renderScene={this._renderScene}
        configureScene={(route, navigator) => {
          if (route && route.sceneConfig) {
            return route.sceneConfig;
          }
          // FloatFromBottom
          // FloatFromRight
          // HorizontalSwipeJump
          // PushFromRight
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
      />
    );
  }
});


AppRegistry.registerComponent('Mercury', () => Mercury);
