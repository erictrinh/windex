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
      moveWithinScreen(dualKeyBindings[key]);
    }
  } else {
    if (singleKeyBindings[key]) {
      moveWithinScreen(singleKeyBindings[key]);
    }
  }

  lastKey = key;
  lastTime = Date.now();
});
