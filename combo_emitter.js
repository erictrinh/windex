'use strict';

var Bacon = require('baconjs').Bacon;

var EventEmitter = require('events').EventEmitter;
var vent = new EventEmitter();

var shortcutEmitter = require('./shortcut_emitter');

Bacon.fromEventTarget(shortcutEmitter, 'shortcut')
  .map(function(key) {
    return {
      key: key,
      timestamp: Date.now()
    };
  })
  .diff({ key: '', timestamp: Date.now() }, function(a, b) {
    return {
      prevKey: a.key,
      newKey: b.key,
      diff: b.timestamp - a.timestamp
    };
  })
  .onValue(function(obj) {
    if (obj.diff < 300) {
      vent.emit('shortcut', obj.prevKey + ' ' + obj.newKey);
    } else {
      vent.emit('shortcut', obj.newKey);
    }
  });

module.exports = vent;
