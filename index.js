'use strict';

var _ = require('lodash'),
  vent = require('./shortcut_emitter'),
  mover = require('./mover'),
  moveWithinScreen = mover.moveWithinScreen,
  moveToNextScreen = mover.moveToNextScreen,
  grid = require('./grid');

var mode = 3;

var changeMode = function(newMode) {
  mode = newMode;
  vent.emit('changeMode', mode);
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

  '`' : moveToNextScreen
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
  '2 4' : function() { moveWithinScreen(grid(2, mode, 3)); }
};

var reversedKeyBindings = _(dualKeyBindings).pairs().map(function(binding) {
  var key = binding[0],
    val = binding[1],
    twoKeys = key.split(' '),
    reversed = _(twoKeys).reverse().join(' ').valueOf();

  return [reversed, val];
}).object().valueOf();

_.extend(dualKeyBindings, reversedKeyBindings);

console.log(_.keys(dualKeyBindings).toString());

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
