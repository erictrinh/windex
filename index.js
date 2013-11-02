'use strict';

var Zephyros = require('node-zephyros');
var _ = require('lodash');

var moveWindow = require('./move_window');
var focusApp = require('./focus_app');

var z = new Zephyros();
var hyper = ['Cmd', 'Shift', 'Ctrl', 'Alt'];

var rightHalf  = { x: 0.5, y: 0, w: 0.5, h: 1 };
var leftHalf   = { x: 0, y: 0, w: 0.5, h: 1 };
var fullScreen = { x: 0, y: 0, w: 1, h: 1 };

var quarter1   = { x: 0, y: 0, w: 0.25, h: 1 };
var quarter2   = { x: 0.25, y: 0, w: 0.25, h: 1 };
var quarter3   = { x: 0.5, y: 0, w: 0.25, h: 1 };
var quarter4   = { x: 0.75, y: 0, w: 0.25, h: 1 };

z.bind('right', hyper).then(function() {
  moveWindow(z, rightHalf);
});

z.bind('left', hyper).then(function() {
  moveWindow(z, leftHalf);
});

z.bind('up', hyper).then(function() {
  moveWindow(z, fullScreen);
});

z.bind('1', hyper).then(function() {
  moveWindow(z, quarter1);
});

z.bind('2', hyper).then(function() {
  moveWindow(z, quarter2);
});

z.bind('3', hyper).then(function() {
  moveWindow(z, quarter3);
});

z.bind('4', hyper).then(function() {
  moveWindow(z, quarter4);
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
