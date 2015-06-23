var debug = require('debug')('AppActions');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
  save: function (obj) {
    debug('save');
    AppDispatcher.dispatch({
      type: 'update',
      data: obj
    });
  },

  saveKeys: function (arr) {
    debug('save');
    AppDispatcher.dispatch({
      type: 'updateKeys',
      data: arr
    })
  },

  remove: function (k) {
    debug('remove');
    AppDispatcher.dispatch({
      type: 'remove',
      data: {
        key: k
      }
    });
  },

  removeKeys: function (arr) {
    debug('removeKeys');
    AppDispatcher.dispatch({
      type: 'removeKeys',
      data: arr
    });
  }
};

module.exports = AppActions;
