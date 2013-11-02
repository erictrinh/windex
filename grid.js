'use strict';
// This creates coordinates and widths given a column number and total columns
// e.g.: total of 4 and column of 2 is the 2nd column if the screen
//       were split into 4 vertical columns

module.exports = function(columnNumber, totalColumns, columnSpan) {
  columnSpan = columnSpan || 1;

  return {
    x: (columnNumber - 1) / totalColumns,
    y: 0,
    w: 1 / totalColumns,
    h: 1
  };
};
