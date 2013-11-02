'use strict';

var exec = require('child_process').exec;
var child;

module.exports = function(appName) {
  appName = appName.replace(' ', '\\ ');
  // executes `pwd`
  child = exec('sh ' + __dirname + '/findopen.sh ' + appName, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    child.kill();
  });
};
