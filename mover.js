'use strict';

var _ = require('lodash');

var z = require('./z');

var runScript = require('./run_script');

var lastState = {};

var setCoords = function(coords) {
  z.api()
    .windowFocused()
    .getWindowFrame()
    .then(function(window) {
      lastState = _.clone(window.frame);
      return window;
    })
    .setWindowFrame(function(win) {
      if ('x' in coords)
        win.frame.x = coords.x;
      if ('y' in coords)
        win.frame.y = coords.y;
      if ('w' in coords)
        win.frame.w = coords.w;
      if ('h' in coords)
        win.frame.h = coords.h;
      return win;
    });
};

var moveInScreen = function(screen, multiples) {
  var frame = screen.frame;
  var newCoords = {};

  if ('x' in multiples)
    newCoords.x = frame.x + frame.w * multiples.x;
  if ('y' in multiples)
    newCoords.y = frame.y + frame.h * multiples.y;
  if ('w' in multiples)
    newCoords.w = frame.w * multiples.w;
  if ('h' in multiples)
    newCoords.h = frame.h * multiples.h;

  setCoords(newCoords);
};

exports.moveToNextScreen = function() {
  var screenID;
  var windowFrame;
  var screenFrame;

  z.api()
    .windowFocused()
    .getWindowFrame()
    .then(function(window) {
      windowFrame = window.frame;
      return window;
    })
    .screenFromWindow()
    .then(function(screen) {
      screenID = screen.id;
      return screen;
    })
    .frameWithoutDockOrMenu()
    .then(function(screen) {
      screenFrame = screen.frame;

      doActualMove(windowFrame, screenFrame);
    });

  function doActualMove(winFrame, oldScreenFrame) {
    var newCoords = {
      x: (winFrame.x - oldScreenFrame.x) / oldScreenFrame.w,
      y: (winFrame.y - oldScreenFrame.y) / oldScreenFrame.h,
      w: winFrame.w / oldScreenFrame.w,
      h: winFrame.h / oldScreenFrame.h
    };

    z.api()
      .screens()
      .then(function(screens) {
        var currScreenIndex = _.findIndex(screens, { id: screenID });
        var nextScreenIndex = currScreenIndex >= screens.length - 1 ?
          0 : currScreenIndex + 1;
        var nextScreen = screens[nextScreenIndex];

        return nextScreen;
      })
      .frameWithoutDockOrMenu()
      .then(function(screen) {
        moveInScreen(screen, newCoords);
      });
  }
};

exports.moveWithinScreen = function(multiples) {
  z.api()
    .windowFocused()
    .screenFromWindow()
    .frameWithoutDockOrMenu()
    .then(function(screen) {
      moveInScreen(screen, multiples);
    });
};

exports.moveMouse = function() {
  z.api()
    .windowFocused()
    .screenFromWindow()
    .frameWithoutDockOrMenu()
    .then(function(screen) {
      var x = screen.frame.x,
        y = screen.frame.y,
        w = screen.frame.w,
        h = screen.frame.h;

      runScript('move', w/2 + x, h/2 + y);
    });
};

exports.undoMove = function() {
  setCoords(lastState);
};
