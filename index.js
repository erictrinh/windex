'use strict';

var vent = require('./shortcut_emitter');

var mover = require('./mover'),
  moveWithinScreen = mover.moveWithinScreen,
  moveToNextScreen = mover.moveToNextScreen;

var grid = require('./grid');

var mode = 3;

var changeMode = function(newMode) {
  mode = newMode;
  vent.emit('changeMode', mode);
};

var leftHalf   = grid(1, 2),
    rightHalf  = grid(2, 2),
    fullScreen = grid(1, 1),
    slice1     = function() { return grid(1, mode); },
    slice2     = function() { return grid(2, mode); },
    slice3     = function() { return grid(3, mode); },
    slice4     = function() { return grid(4, mode); };

var topLeft = { x: 0, y: 0, w: 0.5, h: 0.5 };
var topRight = { x: 0.5, y: 0, w: 0.5, h: 0.5 };
var bottomLeft = { x: 0, y: 0.5, w: 0.5, h: 0.5 };
var bottomRight = { x: 0.5, y: 0.5, w: 0.5, h: 0.5 };

var singleKeyBindings = {
  'right'  : function() { moveWithinScreen(rightHalf); },
  'left'   : function() { moveWithinScreen(leftHalf); },
  'return' : function() { moveWithinScreen(fullScreen); },
  '1'      : function() { moveWithinScreen(slice1()); },
  '2'      : function() { moveWithinScreen(slice2()); },
  '3'      : function() { moveWithinScreen(slice3()); },
  '4'      : function() { moveWithinScreen(slice4()); },

  '`' : moveToNextScreen,
};

var dualKeyBindings = {
  'up right'    : function() { moveWithinScreen(topRight); },
  'right up'    : function() { moveWithinScreen(topRight); },
  'up left'     : function() { moveWithinScreen(topLeft); },
  'left up'     : function() { moveWithinScreen(topLeft); },
  'down right'  : function() { moveWithinScreen(bottomRight); },
  'right down'  : function() { moveWithinScreen(bottomRight); },
  'down left'   : function() { moveWithinScreen(bottomLeft); },
  'left down'   : function() { moveWithinScreen(bottomLeft); },

  '3 3' : function() { changeMode(3); },
  '4 4' : function() { changeMode(4); },

  '1 2' : function() { moveWithinScreen(grid(1, mode, 2)); },
  '2 1' : function() { moveWithinScreen(grid(1, mode, 2)); },
  '2 3' : function() { moveWithinScreen(grid(2, mode, 2)); },
  '3 2' : function() { moveWithinScreen(grid(2, mode, 2)); },
  '1 3' : function() { moveWithinScreen(grid(1, mode, 3)); },
  '3 1' : function() { moveWithinScreen(grid(1, mode, 3)); },
  '2 4' : function() { moveWithinScreen(grid(2, mode, 3)); },
  '4 2' : function() { moveWithinScreen(grid(2, mode, 3)); }
};

var lastKey = '';
var lastTime = Date.now();

vent.on('shortcut', function(key) {
  var now = Date.now();

  var dualKey = key + ' ' + lastKey;

  if (now - lastTime < 300 && dualKeyBindings[dualKey]) {
    dualKeyBindings[dualKey].call(this);
  } else if (singleKeyBindings[key]) {
    singleKeyBindings[key].call(this);
  }

  lastKey = key;
  lastTime = Date.now();
});
