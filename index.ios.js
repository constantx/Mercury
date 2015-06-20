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
  AsyncStorage,
  Navigator
} = React;

var routes = {
  'settings': {
    id: 'settings',
    name: 'Settings'
  },
  'compose': {
    id: 'compose',
    name: 'Compose'
  }
};

var Mercury = React.createClass({

  getInitialState () {
    return {
      initialRouteId: 'compose'
    }
  },
  /**
   * see if there's already a user name in storeage
   * if not, set initial route to settings screen
   * @return {[type]} [description]
   */
  componentDidMount () {
    AsyncStorage.getItem('username')
      .then((value) => {
        console.log('componentDidMount value', value);
        if (value !== null){
          this.setState({initialRouteId: 'settings'});
        } else {
          this.setState({initialRouteId: 'compose'});
        }
      })
      .catch((error) => alert('AsyncStorage error: ' + error.message))
      .done();
  },

  renderScene (route, navigator) {
    console.log('renderScene route', route);
    switch (route.id) {
      case 'compose':
        return <ScreenCompose navigator={navigator} />;
      default:
        return (
          <ScreenSetting navigator={navigator} />
        );
    }
  },

  render () {
    return (
      // <NavigatorExample />

      <Navigator
        initialRoute={routes[this.state.initialRouteId]}
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
