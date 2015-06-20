/**
 * Mercury iOS
 * https://github.com/constantx/mercury
 *
 * Sample JSON
 * http://registry.jsonresume.org/constantx.json
 * http://registry.jsonresume.org/thomasdavis.json
 */
'use strict';


var React = require('react-native');
var GStyles = require('./components/global-styles.js');
var ScreenSetting = require('./components/screen-setting.js')
var ScreenCompose = require('./components/screen-compose.js')
var NavigatorExample = require('./components/ExampleNavigator/NavigatorExample')
var {
  AppRegistry,
  Navigator
} = React;

var Mercury = React.createClass({

  renderScene: function (route, navigator) {
    console.log('route', route);
    switch (route.id) {
      case 'compose':
        return <ScreenCompose navigator={navigator} />;
      default:
        return (
          <ScreenSetting navigator={navigator} />
        );
    }
  },

  render: function () {
    return (
      // <NavigatorExample />

      <Navigator
        initialRoute={{id: 'settings', name: 'Settings'}}
        renderScene={this.renderScene}
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
