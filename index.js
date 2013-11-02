'use strict';

var vent = require('./shortcut_emitter');

var mover = require('./move_window');
var moveWithinScreen = mover.moveWithinScreen;
var moveToNextScreen = mover.moveToNextScreen;

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

var singleKeyBindings = {
  'right' : function() { moveWithinScreen(rightHalf); },
  'left'  : function() { moveWithinScreen(leftHalf); },
  'up'    : function() { moveWithinScreen(fullScreen); },
  '1'     : function() { moveWithinScreen(quarter1); },
  '2'     : function() { moveWithinScreen(quarter2); },
  '3'     : function() { moveWithinScreen(quarter3); },
  '4'     : function() { moveWithinScreen(quarter4); }
};

var dualKeyBindings = {
  'up right'   : function() { moveWithinScreen(topRight); },
  'right up'   : function() { moveWithinScreen(topRight); },
  'up left'    : function() { moveWithinScreen(topLeft); },
  'left up'    : function() { moveWithinScreen(topLeft); },
  'down right' : function() { moveWithinScreen(bottomRight); },
  'right down' : function() { moveWithinScreen(bottomRight); },
  'down left'  : function() { moveWithinScreen(bottomLeft); },
  'left down'  : function() { moveWithinScreen(bottomLeft); }
};

var lastKey = '';
var lastTime = Date.now();

vent.on('shortcut', function(key) {
  var now = Date.now();

  if (now - lastTime < 300) {
    key += ' ' + lastKey;
    if (dualKeyBindings[key]) {
      dualKeyBindings[key].call(this);
    }
  } else {
    if (singleKeyBindings[key]) {
      singleKeyBindings[key].call(this);
    }
  }

  lastKey = key;
  lastTime = Date.now();
});
