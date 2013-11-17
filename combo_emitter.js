'use strict';

var Bacon = require('baconjs').Bacon;

var EventEmitter = require('events').EventEmitter;
var vent = new EventEmitter();

var shortcutEmitter = require('./shortcut_emitter');

var keys = Bacon.fromEventTarget(shortcutEmitter, 'shortcut'),
  times = keys.map(function() { return Date.now(); }),
  dualKeys = keys.diff('', function(a, b) { return a + ' ' + b; }),
  timediff = times.diff(Date.now(), function(a, b) { return b - a; });

Bacon.onValues(keys, dualKeys, timediff, function(key, dualKey, diff) {
  vent.emit('shortcut', diff < 300 ? dualKey : key);
});

module.exports = vent;
