"use strict";

var EASY_PUZZLE = "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";
var MEDIUM_PUZZLE = "-3-5--8-45-42---1---8--9---79-8-61-3-----54---5------78-----7-2---7-46--61-3--5--";
var HARD_PUZZLE = "8----------36------7--9-2---5---7-------457-----1---3---1----68--85---1--9----4--";

var SudokuSolver = (function () {
  function SudokuSolver() {
    var solver = {};

    function solve(boardString) {
      var boardArray = boardString.split("");
      if (boardIsInvalid(boardArray)) {
        return false;
      }
      return recursiveSolve(boardArray);
    }

    function solveAndPrint(boardString) {
      var solvedBoard = solve(boardString);
      console.log(toString(solvedBoard.split("")));
      return solvedBoard;
    }

    function recursiveSolve(boardArray) {
      var emptyCells = findEmptyCells(boardArray);
      if (emptyCells.length === 0) {
        return boardArray.join("");
      }

      var nextCell = emptyCells[0];
      var possibilities = getPossibilities(boardArray, nextCell);

      for (var i = 0; i < possibilities.length; i++) {
        boardArray[nextCell] = possibilities[i];
        var solvedBoard = recursiveSolve(boardArray);
        if (solvedBoard) {
          return solvedBoard;
        }
      }

      boardArray[nextCell] = "-";
      return false;
    }

    function findEmptyCells(boardArray) {
      var emptyCells = [];
      for (var i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === "-") {
          emptyCells.push(i);
        }
      }
      return emptyCells;
    }

    function getPossibilities(boardArray, cellIndex) {
      var existingValues = getAllIntersections(boardArray, cellIndex);
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function (num) {
        return existingValues.indexOf(num) < 0;
      });
    }

    function getAllIntersections(boardArray, cellIndex) {
      var row = getRow(boardArray, cellIndex);
      var column = getColumn(boardArray, cellIndex);
      var box = getBox(boardArray, cellIndex);
      return row.concat(column, box);
    }

    function getRow(boardArray, cellIndex) {
      var rowStart = Math.floor(cellIndex / 9) * 9;
      return boardArray.slice(rowStart, rowStart + 9);
    }

    function getColumn(boardArray, cellIndex) {
      var colStart = cellIndex % 9;
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (num) {
        return boardArray[colStart + num * 9];
      });
    }

    function getBox(boardArray, cellIndex) {
      var boxRow = Math.floor(cellIndex / 27);
      var boxCol = Math.floor((cellIndex % 9) / 3);
      var boxStart = boxRow * 27 + boxCol * 3;
      return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(function (num) {
        return boardArray[boxStart + num];
      });
    }

    function boardIsInvalid(boardArray) {
      return !boardIsValid(boardArray);
    }

    function boardIsValid(boardArray) {
      return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
    }

    function allRowsValid(boardArray) {
      return checkCollections(boardArray, getRow);
    }

    function allColumnsValid(boardArray) {
      return checkCollections(boardArray, getColumn);
    }

    function allBoxesValid(boardArray) {
      return checkCollections(boardArray, getBox);
    }

    function checkCollections(boardArray, getter) {
      for (var i = 0; i < 9; i++) {
        var collection = getter(boardArray, i * 9);
        if (!collectionIsValid(collection)) {
          return false;
        }
      }
      return true;
    }

    function collectionIsValid(collection) {
      var numSet = new Set();
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] !== "-" && numSet.has(collection[i])) {
          return false;
        }
        numSet.add(collection[i]);
      }
      return true;
    }

    function toString(boardArray) {
      var result = "";
      for (var i = 0; i < 81; i += 9) {
        result += boardArray.slice(i, i + 9).join(" ") + "\n";
      }
      return result;
    }

    solver.solve = solve;
    solver.solveAndPrint = solveAndPrint;
    return solver;
  }

  return SudokuSolver();
})();

SudokuSolver.solveAndPrint(EASY_PUZZLE);
