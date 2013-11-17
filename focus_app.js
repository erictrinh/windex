'use strict';

var runCmd = require('./run_cmd');

var appMap = {
  'Finder': '/System/Library/CoreServices/Finder.app',
  'Terminal': '/Applications/Utilities/Terminal.app'
};

// escapes spaces in a string
var escape = function(str) {
  return str.replace(' ', '\\ ');
};

// translates app name to its location
var nameToLocation = function(name) {
  // if the app name is in our hash, use that
  // if not, look for it in Applications folder

  if (name in appMap) {
    return escape(appMap[name]);
  } else {
    return '/Applications/' + escape(name) + '.app';
  }
};

module.exports = function(appName) {
  runCmd('open ' + nameToLocation(appName));
};
