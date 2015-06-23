'use strict';


var debug = require('debug')('AppStore');
var React = require('react-native');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'update';
var REMOVE_EVENT = 'remove';

var {
  AsyncStorage
} = React;

/**
 * set key and value
 * @param  {[type]}   k  [description]
 * @param  {[type]}   v  [description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
function update (k, v) {
  return AsyncStorage.setItem(k, v);
}

function updateKeys (arr) {
  return AsyncStorage.multiSet(arr);
}

function remove (k) {
  return AsyncStorage.removeItem(k);
}

function removeKeys (keys) {
  return AsyncStorage.multiRemove(keys);
}


var AppStore = assign({}, EventEmitter.prototype, {
  /**
   * get an item from local storage and return a promise
   * @param  {String} k key to get
   * @return {Promise} promise from AsyncStorage
   */
  get (k) {
    debug('getting key', k);
    return AsyncStorage.getItem(k);
  },

  getKeys (keys) {
    debug('getting keys', keys);
    return AsyncStorage.multiGet(keys);
  },

  addChangeListener (cb) {
    debug('addChangeListener');
    this.on(CHANGE_EVENT, cb);
  },


  removeChangeListener (cb) {
    debug('removeChangeListener');
    this.removeListener(CHANGE_EVENT, cb);
  },


  emitChange () {
    debug('emitChange');
    this.emit(CHANGE_EVENT);
  }
});


AppDispatcher.register(function (x) {
  debug('dispatched', x);
  var type = x.type;
  var data = x.data;

  switch (type) {
    case CHANGE_EVENT:
      update(data.key, data.val)
        .then(() => AppStore.emitChange());
      break;

    case `${CHANGE_EVENT}Keys`:
      updateKeys(data)
        .then(() => AppStore.emitChange());
      break;

    case REMOVE_EVENT:
      remove(data.key)
        .then(() => AppStore.emitChange());
      break;

    case `${REMOVE_EVENT}Keys`:
      removeKeys(data)
        .then(() => AppStore.emitChange());
      break;
  }
});

module.exports = AppStore;
