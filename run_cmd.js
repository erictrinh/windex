'use strict';

var exec = require('child_process').exec;

module.exports = function(command) {
  console.log(command);

  exec(command, function (error) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};
