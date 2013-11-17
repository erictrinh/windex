'use strict';

var _ = require('lodash'),

  vent = require('./combo_emitter'),
  alert = require('./alert'),

  mover = require('./mover'),
  moveWithinScreen = mover.moveWithinScreen,
  moveToNextScreen = mover.moveToNextScreen,
  moveMouse = mover.moveMouse,
  grid = require('./grid'),
  runScript = require('./run_script'),
  focusApp = require('./focus_app'),
  openLatest = runScript.bind(null, 'openlatest.sh');

var mode = 3;

var changeMode = function(newMode) {
  mode = newMode;
  alert('Change mode ' + mode);
};

var leftHalf    = grid(1, 2),
    rightHalf   = grid(2, 2),
    fullScreen  = grid(1, 1),
    topLeft     = grid(1, 2, 1, 1, 2, 1),
    topRight    = grid(2, 2, 1, 1, 2, 1),
    bottomLeft  = grid(1, 2, 1, 2, 2, 1),
    bottomRight = grid(2, 2, 1, 2, 2, 1);

var singleKeyBindings = {
  'right'  : function() { moveWithinScreen(rightHalf); },
  'left'   : function() { moveWithinScreen(leftHalf); },
  'return' : function() { moveWithinScreen(fullScreen); },
  '1'      : function() { moveWithinScreen(grid(1, mode)); },
  '2'      : function() { moveWithinScreen(grid(2, mode)); },
  '3'      : function() { moveWithinScreen(grid(3, mode)); },
  '4'      : function() { moveWithinScreen(grid(4, mode)); },

  'o'      : openLatest,

  '`' : moveToNextScreen,
  'delete' : function() {
    moveMouse();
    alert('Center mouse');
  }
};

var dualKeyBindings = {
  'up right'    : function() { moveWithinScreen(topRight); },
  'up left'     : function() { moveWithinScreen(topLeft); },
  'down right'  : function() { moveWithinScreen(bottomRight); },
  'down left'   : function() { moveWithinScreen(bottomLeft); },

  '3 3' : function() { changeMode(3); },
  '4 4' : function() { changeMode(4); },

  '1 2' : function() { moveWithinScreen(grid(1, mode, 2)); },
  '2 3' : function() { moveWithinScreen(grid(2, mode, 2)); },
  '1 3' : function() { moveWithinScreen(grid(1, mode, 3)); },
  '2 4' : function() { moveWithinScreen(grid(2, mode, 3)); },
  '3 4' : function() { moveWithinScreen(grid(3, mode, 2)); }
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
    reversed = _(twoKeys).reverse().join(' ');

  return [reversed, val];
}).object().valueOf();

var keyBindings = _.extend(
  dualKeyBindings,
  reversedKeyBindings,
  singleKeyBindings
);

vent.on('shortcut', function(key) {
  if (key in appBindings) {
    focusApp(appBindings[key]);
  } else if (key in keyBindings) {
    keyBindings[key].call(this);
  }
});
