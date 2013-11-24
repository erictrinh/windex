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
      win.frame.x = coords.x;
      win.frame.y = coords.y;
      win.frame.w = coords.w;
      win.frame.h = coords.h;
      return win;
    });
};

var moveInScreen = function(screen, multiples) {
  var frame = screen.frame;
  var newCoords = {
    x : frame.x + frame.w * multiples.x,
    y : frame.y + frame.h * multiples.y,
    w : frame.w * multiples.w,
    h : frame.h * multiples.h
  };

  setCoords(newCoords);

  // z.api()
  //   .windowFocused()
  //   .getWindowFrame()
  //   .then(function(window) {
  //     lastState = _.clone(window.frame, true);
  //     return window;
  //   })
  //   .setWindowFrame(function(win) {
  //     win.frame.x = frame.x + frame.w * multiples.x;
  //     win.frame.y = frame.y + frame.h * multiples.y;
  //     win.frame.w = frame.w * multiples.w;
  //     win.frame.h = frame.h * multiples.h;
  //     return win;
  //   });
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
