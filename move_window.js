'use strict';

module.exports = function(z, multiples) {
  z.api()
    .windowFocused()
    .screenFromWindow()
    .frameIncludingDockAndMenu()
    .then(function(screen) {
      var frame = screen.frame;

      z.api()
        .windowFocused()
        .getWindowFrame()
        .setWindowFrame(function(win) {
          win.frame.x = frame.w * multiples.x;
          win.frame.y = frame.h * multiples.y;
          win.frame.w = frame.w * multiples.w;
          win.frame.h = frame.h * multiples.h;
          return win;
        });
    });
};
