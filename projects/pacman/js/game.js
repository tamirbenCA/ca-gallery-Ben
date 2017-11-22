'use strict';

var WALL = '█';
var FOOD = '.';
var EMPTY = ' ';
var SUPERFOOD = '@';

var gBoard;
var gState;

function init() {
  gState = {
    score: 0,
    isGameDone: false,
    foodCount: 0
  };

  var elModal = document.querySelector('#myModal');
  elModal.style.display = "none";
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  // console.table(gBoard);
}


function buildBoard() {
  var SIZEY = 20;
  var SIZEX = 11;
  var board = [];
  for (var i = 0; i < SIZEX; i++) {
    board.push([]);
    for (var j = 0; j < SIZEY; j++) {
      board[i][j] = FOOD;
      
      if (i === 0 || i === SIZEX - 1 ||
        j === 0 || j === SIZEY - 1 ||
        i === 1 && j === 5 || i === 1 && j === 14 ||
        i === 2 && j === 2 || i === 2 && j === 3 ||
        i === 2 && j === 5 || i === 2 && j === 7 ||
        i === 2 && j === 8 || i === 2 && j === 9 ||
        i === 2 && j === 10 || i === 2 && j === 11 ||
        i === 2 && j === 12 || i === 2 && j === 14 ||
        i === 2 && j === 16 || i === 2 && j === 17 ||
        i === 3 && j === 2 || i === 3 && j === 17 ||
        i === 4 && j === 2 || i === 4 && j === 4 ||
        i === 4 && j === 5 || i === 4 && j === 7 ||
        i === 4 && j === 8 || i === 4 && j === 11 ||
        i === 4 && j === 12 || i === 4 && j === 14 ||
        i === 4 && j === 15 || i === 4 && j === 17 ||
        i === 5 && j === 7 || i === 5 && j === 12 ||
        i === 6 && j === 2 || i === 6 && j === 4 ||
        i === 6 && j === 5 || i === 6 && j === 7 ||
        i === 6 && j === 8 || i === 6 && j === 9 ||
        i === 6 && j === 10 || i === 6 && j === 11 ||
        i === 6 && j === 12 || i === 6 && j === 14 ||
        i === 6 && j === 15 || i === 6 && j === 17 ||
        i === 7 && j === 2 || i === 7 && j === 17 ||
        i === 8 && j === 2 || i === 8 && j === 3 ||
        i === 8 && j === 5 || i === 8 && j === 7 ||
        i === 8 && j === 8 || i === 8 && j === 9 ||
        i === 8 && j === 10 || i === 8 && j === 11 ||
        i === 8 && j === 12 || i === 8 && j === 14 ||
        i === 8 && j === 16 || i === 8 && j === 17 ||
        i === 9 && j === 5 || i === 9 && j === 14) {
          board[i][j] = WALL;
        }

      if (i === 4 && j === 9 || i === 4 && j === 10 ||
        i === 5 && j === 8 || i === 5 & j === 9 ||
        i === 5 && j === 10 || i === 5 && j === 11) {
          board[i][j] = EMPTY;
        }

      if (i === 1 && j === 1 || i === 1 && j === SIZEY - 2 ||
        i === SIZEX - 2 && j === 1 || i === SIZEX - 2 && j === SIZEY -2) {
          board[i][j] = SUPERFOOD
        }

      if (board[i][j] === FOOD || board[i][j] === SUPERFOOD) gState.foodCount++;
    }
  }
  createPacman(board);
  createGhosts(board);
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent, nextLocation) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
      // gGhosts = gGhosts.filter(function(ghost) {
        //   return !(gPacman.location.i && gPacman.location.j)
        // })
        gGhosts.forEach(function (ghost, idx) {
          if (ghost.location.i === nextLocation.i &&
            ghost.location.j === nextLocation.j) {
              if (gGhosts[idx].currCellContent === FOOD || gGhosts[idx].currCellContent === SUPERFOOD) {
                gState.foodCount--
              }
              gGhosts.splice(idx, 1);
              updateScore(10);
            }
          });
        } else {
          var elGameOver = document.querySelector('.gameOverText');
          elGameOver.innerText = 'Game Over!';
          var elImage = document.querySelector('.gameOverImage');
          elImage.innerHTML = '<img src="img/ghost.png" class="image">';
          gameOver();
        }
      }
      return false;
    }
    
    
    // this function updates both the model and the dom for the score
    function updateScore(value) {
      gState.score += value;
      document.querySelector('header > h3 > span').innerText = gState.score;
    }
    
    function renderCell(location, value, color) {
      var cellSelector = '.cell' + location.i + '-' + location.j;
      var elCell = document.querySelector(cellSelector);
      elCell.innerHTML = value;
      elCell.style.color = color;
    }
    
    function gameOver() {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      // Get the modal
      var elModal = document.querySelector('#myModal');
      // Open the modal
      elModal.style.display = "block";
      // Get the <span> element that closes the modal
      var elClose = document.querySelector('.close');
      // When the user clicks on <span> (x), close the modal
      elClose.onclick = function() {
        elModal.style.display = "none";
      }
      return true;
    }
    
    
    // function buildBoard() {
    //   var SIZE = 10;
    //   var board = [];
    //   for (var i = 0; i < SIZE; i++) {
    //     board.push([]);
    //     for (var j = 0; j < SIZE; j++) {
    //       board[i][j] = FOOD;
          
    //       if (i === 0 || i === SIZE - 1 ||
    //         j === 0 || j === SIZE - 1 ||
    //         (j == 3 && i > 4 && i < SIZE - 2)) { 
    //           board[i][j] = WALL;
    //       }
    //       if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
    //         i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE -2) {
    //           board[i][j] = SUPERFOOD
    //         }
    
    
    //       if (board[i][j] === FOOD || board[i][j] === SUPERFOOD) gState.foodCount++;
    //     }
    //   }
    //   createPacman(board);
    //   createGhosts(board);
    //   return board;
    // }