'use strict';

var vent = require('./shortcut_emitter');

var mover = require('./mover'),
  moveWithinScreen = mover.moveWithinScreen,
  moveToNextScreen = mover.moveToNextScreen;

var grid = require('./grid');

var leftHalf   = grid(1, 2),
    rightHalf  = grid(2, 2),
    fullScreen = grid(1, 1),
    third1     = grid(1, 3),
    third2     = grid(2, 3),
    third3     = grid(3, 3);

var topLeft = { x: 0, y: 0, w: 0.5, h: 0.5 };
var topRight = { x: 0.5, y: 0, w: 0.5, h: 0.5 };
var bottomLeft = { x: 0, y: 0.5, w: 0.5, h: 0.5 };
var bottomRight = { x: 0.5, y: 0.5, w: 0.5, h: 0.5 };

var singleKeyBindings = {
  'right' : function() { moveWithinScreen(rightHalf); },
  'left'  : function() { moveWithinScreen(leftHalf); },
  'up'    : function() { moveWithinScreen(fullScreen); },
  '1'     : function() { moveWithinScreen(third1); },
  '2'     : function() { moveWithinScreen(third2); },
  '3'     : function() { moveWithinScreen(third3); },
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
  'right right' : moveToNextScreen,
  'left left'   : moveToNextScreen
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
