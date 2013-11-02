'use strict';

var EventEmitter = require('events').EventEmitter;
var Zephyros = require('node-zephyros');
var _ = require('lodash');

var moveWindow = require('./move_window');
var focusApp = require('./focus_app');

var vent = new EventEmitter();
var z = new Zephyros();
var hyper = ['Cmd', 'Shift', 'Ctrl', 'Alt'];

var rightHalf  = { x: 0.5, y: 0, w: 0.5, h: 1 };
var leftHalf   = { x: 0, y: 0, w: 0.5, h: 1 };
var fullScreen = { x: 0, y: 0, w: 1, h: 1 };

var quarter1   = { x: 0, y: 0, w: 0.25, h: 1 };
var quarter2   = { x: 0.25, y: 0, w: 0.25, h: 1 };
var quarter3   = { x: 0.5, y: 0, w: 0.25, h: 1 };
var quarter4   = { x: 0.75, y: 0, w: 0.25, h: 1 };

var topLeft = { x: 0, y: 0, w: 0.5, h: 0.5 };
var topRight = { x: 0.5, y: 0, w: 0.5, h: 0.5 };
var bottomLeft = { x: 0, y: 0.5, w: 0.5, h: 0.5 };
var bottomRight = { x: 0.5, y: 0.5, w: 0.5, h: 0.5 };

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

var singleKeyBindings = {
  'right' : rightHalf,
  'left'  : leftHalf,
  'up'    : fullScreen,
  '1'     : quarter1,
  '2'     : quarter2,
  '3'     : quarter3,
  '4'     : quarter4
};

var dualKeyBindings = {
  'up right'   : topRight,
  'right up'   : topRight,
  'up left'    : topLeft,
  'left up'    : topLeft,
  'down right' : bottomRight,
  'right down' : bottomRight,
  'down left'  : bottomLeft,
  'left down'  : bottomLeft
};

var lastKey = '';
var lastTime = Date.now();

vent.on('shortcut', function(key) {
  var now = Date.now();

  if (now - lastTime < 300) {
    key += ' ' + lastKey;
    if (dualKeyBindings[key]) {
      moveWindow(z, dualKeyBindings[key]);
    }
  } else {
    if (singleKeyBindings[key]) {
      moveWindow(z, singleKeyBindings[key]);
    }
  }

  lastKey = key;
  lastTime = Date.now();
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
