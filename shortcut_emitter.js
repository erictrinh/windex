'use strict';

var Zephyros = require('node-zephyros');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var focusApp = require('./focus_app');

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

// get next screen
z.bind('t', ['Cmd', 'Shift'])
.screens()
.then(function(screens){
  screens.forEach(console.log);
  return screens[0];
})
.frameWithoutDockOrMenu()
.then(function(screen){
  console.log(screen.frame); //{ x: 0, y: 0, w: 80, h: 80 }
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

vent.on('alert', function(message) {
  z.api().alert(message);
});

module.exports = vent;
