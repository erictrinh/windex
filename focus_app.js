'use strict';

var runCmd = require('./run_cmd');
var runScript = require('./run_script.js')

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
  } else if (fs.existsSync('/Applications/' + name + '.app')) {
    return '/Applications/' + escape(name) + '.app';
  } else {
    return null;
  }
};

module.exports = function(appName) {
  if (nameToLocation(appName)) {
    runCmd('open ' + nameToLocation(appName));
  } else {
    runScript('find_and_open.sh', escape(name))
  }
};
