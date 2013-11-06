'use strict';

var Zephyros = require('node-zephyros');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var runScript = require('./run_script');
var focusApp = runScript.bind(null, 'findopen');

var vent = new EventEmitter();
var z = new Zephyros();

var hyper = ['Cmd', 'Shift', 'Ctrl', 'Alt'];

z.bind('return', hyper).then(function() {
  vent.emit('shortcut', 'return');
});

z.bind('right', hyper).then(function() {
  vent.emit('shortcut', 'right');
});

z.bind('left', hyper).then(function() {
  vent.emit('shortcut', 'left');
});

z.bind('up', hyper).then(function() {
  vent.emit('shortcut', 'up');
});

z.bind('down', hyper).then(function() {
  vent.emit('shortcut', 'down');
});

z.bind('1', hyper).then(function() {
  vent.emit('shortcut', '1');
});

z.bind('2', hyper).then(function() {
  vent.emit('shortcut', '2');
});

z.bind('3', hyper).then(function() {
  vent.emit('shortcut', '3');
});

z.bind('4', hyper).then(function() {
  vent.emit('shortcut', '4');
});

z.bind('`', hyper).then(function() {
  vent.emit('shortcut', '`');
});

z.bind('o', hyper).then(function() {
  runScript('openlatest');
});

z.bind('f', hyper).then(function() {
  runScript('openfinder');
});

var appBindings = {
  'c': 'Google Chrome',
  'g': 'GitHub',
  's': 'Sublime Text',
  'y': 'Spotify',
  'm': 'Messages',
  'h': 'HipChat',
  't': 'Terminal',
};

_.pairs(appBindings).forEach(function(pair) {
  var shortcut = pair[0],
    app = pair[1];

  z.bind(shortcut, hyper).then(function() {
    focusApp(app);
  });
});

vent.on('changeMode', function(mode) {
  z.api().alert('Change mode ' + mode);
});

module.exports = vent;
