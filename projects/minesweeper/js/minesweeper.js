'use strict'

var gBoard;
var gLevel = { size: 4, mines: 2 };
var MINE = '✹';
var FLAG = '🚩';
var gCellsToCheck = [];
var timeInterval;

// This is an object in which I keep and update the current state:
// isGameOn – boolean, when true we let the user play
// shownCount - how many cells are shown
// markedCount: how many cells are marked (with a flag)
// secsPassed: how many seconds passed,you need to show it on the page
var gState = {};



// This is called when page loads
function initGame(level) {
    gState = { isGameOn: true, shownCount: 0, markedCount: 0, startTime: 0, size: level.size, mines: level.mines };
    gBoard = buildBoard(gState.size);
    gBoard = putMines(gBoard, gState.mines);
    gBoard = setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}


// Builds the board by setting mines at random locations,
// and then calling the setMinesNegsCount() Then return the created board
function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell();
        }
    }
    return board;
}


function createCell() {
    var cell = {
        value: null,
        bomb: false,
        open: false,
        flag: false
    }
    return cell;
}

function putMines(board, mines) {
    for (var i = 0; i < mines; i++) {
        var row = Math.floor(Math.random() * board.length);
        var col = Math.floor(Math.random() * board[0].length);
        while (board[row][col].value === MINE) {
            var row = Math.floor(Math.random() * board.length);
            var col = Math.floor(Math.random() * board[0].length);
        }
        board[row][col].value = MINE;
        board[row][col].bomb = true;
    }
    return board;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var totalMinesNeighbors = 0;
            for (var row = -1; row < 2; row++) {
                for (var col = -1; col < 2; col++) {
                    if (i + row < 0) continue
                    if (col + j < 0) continue
                    if (!(i + row < board.length)) continue
                    if (!(col + j < board.length)) continue
                    if (board[i + row][j + col].value === MINE) {
                        totalMinesNeighbors++;
                    }
                }
            }
            if (board[i][j].value === MINE) continue
            else if (board[i][j].value === null) {
                board[i][j].value = totalMinesNeighbors;
            }
        }
    }
    return board;
}


// Print the board as a <table> to the page
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>\n';
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j].value;
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '\t<td class="cell cover" id="' + tdId + '" onmousedown="mouseEvent(event, this)">'
            strHtml += cell;
            strHtml += ' </td>'
        }
        strHtml += '\n</tr>\n';
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml;
}


function mouseEvent(evet, elCell) {
    if (event.which === 1) {
        cellClicked(elCell, event);
    }
    if (event.which === 3) {
        window.oncontextmenu = function () {
            cellMarked(elCell, event);
            return false;
        }
    }
}


// Called when a cell (td) is clicked
function cellClicked(elCell, event) {
    var cellCoord = getCellCoord(elCell.id);
    if (gState.isGameOn === true) {
        if (elCell.classList.contains('cover') && event.which === 1) {
            elCell.classList.remove('cover')
            gBoard[cellCoord.i][cellCoord.j].open = true;
            if (event.which === 1) {
                gState.shownCount++;
                if (gState.shownCount === 1) {
                    gState.startTime = Date.now();
                    timeInterval = setInterval(timer, 100)
                }
            }
        }
        if (elCell.innerText === '0') {
            gCellsToCheck = [];     // reset the array for next round check. avoiding infinate loop.
            findNeigOfZero(cellCoord.i, cellCoord.j);
        }
        checkGameOver(elCell);
    }
}


// Called on right click to mark a cell as suspected to have a mine
function cellMarked(elCell, event) {
    var cellCoord = getCellCoord(elCell.id);
    if (elCell.innerText !== FLAG) {
        elCell.innerText = FLAG;
        gState.markedCount++;
    } else if (elCell.innerText === FLAG) {         // unmark flag. can also by with plain else.
        elCell.innerText = gBoard[cellCoord.i][cellCoord.j].value;
        gState.markedCount--;
    }
}



// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    return coord;
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}


// Expand the shown class to neighbors
// At this point I needed to give each cell an ID (or a class) that looks like that: "cell-3-2"
function findNeigOfZero(x, y) {
    if (gBoard[x][y].value === 0) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var idI = x + (i - 1);
                var idJ = y + (j - 1);
                if (idI === x && idJ === y) continue;
                if (idI < 0 || idI >= gBoard.length || idJ < 0 || idJ >= gBoard.length) continue;
                if (gBoard[idI][idJ].value === 0) {
                    if (gBoard[idI][idJ].open === false) {
                        gBoard[idI][idJ].open = true;
                        gCellsToCheck.push({ i: idI, j: idJ });
                        findNeigOfZero(idI, idJ);
                    }
                } else gBoard[idI][idJ].open = true;
            }
        }
        expandShown()
    }
}

// // Expand the shown class to neighbors
// // At this point I needed to give each cell an ID (or a class) that looks like that: "cell-3-2"
function expandShown() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].open === true) {
                var elCell = document.querySelector('#cell-' + i + '-' + j);
                if (elCell.classList.contains('cover')) {
                    gState.shownCount++;
                }
                elCell.classList.remove('cover');
            }
        }
    }
}


// Game ends when all mines are marked and all the other cells are shown
function checkGameOver(elCell) {
    if (elCell.innerText === MINE) {        // hit mine
        console.log('Game Over!');
        gState.isGameOn = false;
        for (var i = 0; i < gBoard.length; i++) {       // open only mines tiles in case of a lost.
            for (var j = 0; j < gBoard[0].length; j++) {
                if (gBoard[i][j].value === MINE) {
                    var selector = getSelector({ i: i, j: j })
                    document.querySelector(selector).classList.remove('cover');
                }
            }
        }
        document.querySelector('.notice').innerHTML = '<img src="img/gameover.jpg">';
    }

    if (Math.pow(gBoard.length, 2) - gLevel.mines === gState.shownCount) {      // finish board
        console.log('You won!')
        gState.isGameOn = false;
        document.querySelector('.notice').innerHTML = '<img src="img/winner.jpg">';
    }

    if (gState.isGameOn === false) {        // stop interval
        clearInterval(timeInterval);
    }
}


function timer() {
    document.querySelector('.time').innerHTML = (((Date.now() - gState.startTime) / 1000));
    document.querySelector('.minesCount').innerHTML = (gState.mines - gState.markedCount);
}


function goBack() {
    window.history.back();
}



// // Game ends when all mines are marked and all the other cells are shown
// function checkGameOver(elCell) {
//     if (elCell.innerText === MINE || Math.pow(gBoard.length, 2) - gLevel.mines === gState.shownCount) {
//         gState.isGameOn = false;
//         console.log('Game Over!');
//     }
// }