'use strict';

var _ = require('lodash'),
  vent = require('./shortcut_emitter'),
  mover = require('./mover'),
  moveWithinScreen = mover.moveWithinScreen,
  moveToNextScreen = mover.moveToNextScreen,
  grid = require('./grid'),
  runScript = require('./run_script'),
  focusApp = runScript.bind(null, 'findopen');

var mode = 3;

var changeMode = function(newMode) {
  mode = newMode;
  vent.emit('alert', 'Change mode ' + mode);
};

var leftHalf    = grid(1, 2),
    rightHalf   = grid(2, 2),
    fullScreen  = grid(1, 1),
    topLeft     = grid(1, 2, 1, 1, 2, 1),
    topRight    = grid(2, 2, 1, 1, 2, 1),
    bottomLeft  = grid(1, 2, 1, 2, 2, 1),
    bottomRight = grid(2, 2, 1, 2, 2, 1);

var singleKeyBindings = {
  'right'  : moveWithinScreen.bind(null, rightHalf),
  'left'   : moveWithinScreen.bind(null, leftHalf),
  'return' : moveWithinScreen.bind(null, fullScreen),
  '1'      : moveWithinScreen.bind(null, grid(1, mode)),
  '2'      : moveWithinScreen.bind(null, grid(2, mode)),
  '3'      : moveWithinScreen.bind(null, grid(3, mode)),
  '4'      : moveWithinScreen.bind(null, grid(4, mode)),

  '`' : moveToNextScreen
};

var dualKeyBindings = {
  'up right'    : moveWithinScreen.bind(null, topRight),
  'up left'     : moveWithinScreen.bind(null, topLeft),
  'down right'  : moveWithinScreen.bind(null, bottomRight),
  'down left'   : moveWithinScreen.bind(null, bottomLeft),

  '3 3' : changeMode.bind(null, 3),
  '4 4' : changeMode.bind(null, 4),

  '1 2' : moveWithinScreen.bind(null, grid(1, mode, 2)),
  '2 3' : moveWithinScreen.bind(null, grid(2, mode, 2)),
  '1 3' : moveWithinScreen.bind(null, grid(1, mode, 3)),
  '2 4' : moveWithinScreen.bind(null, grid(2, mode, 3))
};

var appBindings = {
  'f': 'Finder',
  'c': 'Google Chrome',
  'g': 'GitHub',
  's': 'Sublime Text',
  'y': 'Spotify',
  'm': 'Messages',
  'h': 'HipChat',
  't': 'Terminal'
};

var reversedKeyBindings = _(dualKeyBindings).pairs().map(function(binding) {
  var key = binding[0],
    val = binding[1],
    twoKeys = key.split(' '),
    reversed = _(twoKeys).reverse().join(' ').valueOf();

  return [reversed, val];
}).object().valueOf();

_.extend(dualKeyBindings, reversedKeyBindings);

var lastKey = '';
var lastTime = Date.now();

vent.on('shortcut', function(key) {
  var now = Date.now();

  var dualKey = key + ' ' + lastKey;

  var app = appBindings[key];

  if (app) {
    if (app === 'Finder') {
      runScript('openfinder');
    } else {
      focusApp(app);
    }
  }
  else if (now - lastTime < 300 && dualKeyBindings[dualKey]) {
    dualKeyBindings[dualKey].call(this);
  } else if (singleKeyBindings[key]) {
    singleKeyBindings[key].call(this);
  }

  lastKey = key;
  lastTime = Date.now();
});
