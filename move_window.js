'use strict';
var Zephyros = require('node-zephyros');
var z = new Zephyros();

module.exports = function(multiples) {
  z.api()
    .windowFocused()
    .screenFromWindow()
    .frameWithoutDockOrMenu()
    .then(function(screen) {
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
    });
};
