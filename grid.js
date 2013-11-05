'use strict';
// This creates coordinates and widths given a column number and total columns
// e.g.: total of 4 and column of 2 is the 2nd column if the screen
//       were split into 4 vertical columns

module.exports = function(columnNumber, totalColumns, columnSpan, rowNumber, totalRows, rowSpan) {
  columnSpan = columnSpan || 1;
  rowSpan = rowSpan || 2;
  rowNumber = rowNumber || 1;
  totalRows = totalRows || 2;

  if (columnNumber > totalColumns) {
    columnNumber = totalColumns;
  }

  return {
    x: (columnNumber - 1) / totalColumns,
    y: (rowNumber - 1) / totalRows,
    w: 1 / totalColumns * columnSpan,
    h: 1 / totalRows * rowSpan
  };
};
