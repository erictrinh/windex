'use strict';

var exec = require('child_process').exec;

module.exports = function(scriptName) {
  var args = [].slice.call(arguments, 1);
  args = args.map(function(arg) {
    return arg.replace(' ', '\\ ');
  }).join(' ');

  var command = 'sh ' + __dirname + '/' + scriptName + '.sh';

  if (args) {
    command += ' ' + args;
  }

  exec(command, function (error) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};
