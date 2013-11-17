'use strict';

var EventEmitter = require('events').EventEmitter;

var vent = new EventEmitter();
var z = require('./z');

var hyper = ['Cmd', 'Shift', 'Ctrl', 'Alt'];

[
  'return', 'delete',
  'right', 'left', 'up', 'down',
  '`', '=', '+',
  '1', '2', '3', '4',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q','r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
].forEach(function(key) {
  z.bind(key, hyper).then(function() {
    vent.emit('shortcut', key);
  });
});

vent.on('alert', function(message) {
  z.api().alert(message);
});

module.exports = vent;
