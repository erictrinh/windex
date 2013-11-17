'use strict';

var EventEmitter = require('events').EventEmitter;
var vent = new EventEmitter();

var shortcutEmitter = require('./shortcut_emitter');

var lastKey = '';
var lastTime = Date.now();

shortcutEmitter.on('shortcut', function(key) {
  var now = Date.now();

  var dualKey = lastKey + ' ' + key;

  if (now - lastTime < 300) {
    vent.emit('shortcut', dualKey);
  } else {
    vent.emit('shortcut', key);
  }

  lastKey = key;
  lastTime = Date.now();
});

module.exports = vent;
