'use strict';

var _ = require('lodash');
var exec = require('child_process').exec;

module.exports = function(scriptName, options) {
  var args;

  // check for named arguments
  if (_.isString(options)) {
    // no named args
    args = [].slice.call(arguments, 1).map(function(arg) {
      if (_.isString(arg)) {
        // escape spaces
        return arg.replace(' ', '\\ ');
      } else {
        return arg;
      }
    }).join(' ');
  } else {
    // named args
    args = _(options).pairs().map(function(pair) {
      return ['-' + pair[0], pair[1]];
    }).flatten().join(' ');
  }

  var command = __dirname + '/shell_scripts/' + scriptName;

  if (args) {
    command += ' ' + args;
  }

  if (scriptName.indexOf('.sh') >= 0) {
    command = 'sh ' + command;
  }

  console.log(command);

  exec(command, function (error) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};
