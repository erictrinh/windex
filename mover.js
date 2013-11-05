'use strict';

var Zephyros = require('node-zephyros');
var _ = require('lodash');

var z = new Zephyros();

var moveInScreen = function(screen, multiples) {
  var frame = screen.frame;

  z.api()
    .windowFocused()
    .getWindowFrame()
    .setWindowFrame(function(win) {
      win.frame.x = frame.x + frame.w * multiples.x;
      win.frame.y = frame.y + frame.h * multiples.y;
      win.frame.w = frame.w * multiples.w;
      win.frame.h = frame.h * multiples.h;
      return win;
    });
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

    console.log(newCoords.x, newCoords.y, newCoords.w, newCoords.h);
    z.api()
      .screens()
      .then(function(screens) {
        var notThisScreen = _.find(screens, function(screen) {
          return screen.id !== screenID;
        });

        if (notThisScreen) {
          return notThisScreen;
        } else {
          // return original screen
          return {id: screenID};
        }
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
