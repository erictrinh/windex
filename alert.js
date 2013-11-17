'use strict';

var z = require('./z');

module.exports = function(message) {
  z.api().alert(message);
};
