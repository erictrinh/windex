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
      win.screen = screen;
      return win;
    });
};

exports.moveToNextScreen = function() {
  var screenID;

  z.api()
    .windowFocused()
    .screenFromWindow()
    .then(function(screen) {
      screenID = screen.id;

      z.api()
        .screens()
        .then(function(screens){
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
        .then(function(screen){
          console.log(screen.frame);
        });
    });


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
