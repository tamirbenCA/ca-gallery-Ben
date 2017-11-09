'use strict'


var gBoard;
var SIZE_VER = 5        // size vertical
var SIZE_HOR = 7;       // size horizontal
var SOKOBAN = 'img/sokoban.png';
var WALL = 'img/wall.png';
var BOX = 'img/box.png';
var TARGET = 'img/target.png';
var FLOOR = 'img/floor.png';
var gStepCount = 0;
var gStartTime;
var timeInterval;


function initGame() {
    console.log('welcome to the world of Sokoban!');
    gBoard = createBoard();
}

function createBoard() {
    var board = [];
    for (var i = 0; i < SIZE_VER; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE_HOR; j++) {
            board[i][j] = createCell();
        }
    }
    console.table(board);
    gBoard = buildLevel(board);
    gBoard = renderBoard(board)
    return board;
}


function createCell() {
    var cell = {
        type: '',
        target: false,
    }
    return cell;
}


function buildLevel(board) {
    var levelStrcture = [
        [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
        [WALL, FLOOR, FLOOR, SOKOBAN, FLOOR, FLOOR, WALL],
        [WALL, FLOOR, BOX, BOX, BOX, FLOOR, WALL],
        [WALL, FLOOR, FLOOR, FLOOR, FLOOR, FLOOR, WALL],
        [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ];

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].type = levelStrcture[i][j];
            if ((i === 3 && j === 2) || (i === 3 && j === 3) || (i === 3 && j === 4)) {
                board[i][j].target = true;
            }
        }
    }
    return board;
}


function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j].type;
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '\t<td class="cell" id="' + tdId + '" onclick="findSokoban(this)"> <img src ="' + cell + '"> </td>'
            // strHtml += '\t<td class="' + cell + ' id="' + tdId + '" onclick="findDirection(this)"> <img src ="' + cell + '"> </td>'
            // strHtml += '\t<td class="cell" onclick="findDirection(this)"> <img src ="' + cell + '"> </td>'
        }
        strHtml += '\n</tr>\n';
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml;

    for (var j = 2; j < 5; j++) {
        if (gBoard[3][j].target === true) {
            var selector = getSelector({ i: 3, j: j });
            var elCell = document.querySelector(selector);
            elCell.style.border = 'solid';
            elCell.style.borderColor = 'red';
        }
    }
    checkWin();
}


function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    return coord;
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}


function findSokoban(elCell) {
    if (!gStartTime) {
        gStartTime = Date.now();
        timeInterval = setInterval(timer, 100)
    }
    var coord = getCellCoord(elCell.id);
    for (var row = -1; row < 2; row++ && sokoLocation) {
        for (var col = -1; col < 2; col++) {
            if (coord.i + row < 0) continue;
            if (col + coord.j < 0) continue;
            if (!(coord.i + row < gBoard.length)) continue;
            if (!(col + coord.j < gBoard[0].length)) continue;
            if (gBoard[coord.i + row][coord.j + col].type === SOKOBAN) {
                console.log('Found Waldoo!', (coord.i + row), (coord.j + col))
                var sokoLocation = { i: (coord.i + row), j: (coord.j + col) };
                break;
            }
        }
    }
    if (sokoLocation) {
        if (sokoLocation.i === coord.i && sokoLocation.j < coord.j) {
            moveRight(coord.i, coord.j);
        } else if (sokoLocation.i === coord.i && sokoLocation.j > coord.j) {
            moveLeft(coord.i, coord.j);
        } else if (sokoLocation.i < coord.i && sokoLocation.j === coord.j) {
            moveDown(coord.i, coord.j);
        } else if (sokoLocation.i > coord.i && sokoLocation.j === coord.j) {
            moveUp(coord.i, coord.j);
        }
    }
}


function moveUp(i, j) {
    console.log('mooving up')
    if (gBoard[i][j].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i - 1][j].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i - 1][j].type === BOX) return;
    else if (gBoard[i][j].type === BOX && gBoard[i - 1][j].type !== WALL) {
        gBoard[i - 1][j].type = BOX;
        gBoard[i][j].type = SOKOBAN;
        gBoard[i + 1][j].type = FLOOR;
    } else if (gBoard[i][j].type === FLOOR) {
        gBoard[i][j].type = SOKOBAN;
        gBoard[i + 1][j].type = FLOOR;
    }
    gStepCount++;
    renderBoard(gBoard);
}
function moveDown(i, j) {
    console.log('mooving down')
    if (gBoard[i][j].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i + 1][j].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i + 1][j].type === BOX) return;
    else if (gBoard[i][j].type === BOX && gBoard[i + 1][j].type !== WALL) {
        gBoard[i + 1][j].type = BOX;
        gBoard[i][j].type = SOKOBAN;
        gBoard[i - 1][j].type = FLOOR;
    } else if (gBoard[i][j].type === FLOOR) {
        gBoard[i][j].type = SOKOBAN;
        gBoard[i - 1][j].type = FLOOR;
    }
    gStepCount++;
    renderBoard(gBoard);
}
function moveLeft(i, j) {
    console.log('mooving left')
    if (gBoard[i][j].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i][j - 1].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i][j - 1].type === BOX) return;
    else if (gBoard[i][j].type === BOX && gBoard[i][j - 1].type !== WALL) {
        gBoard[i][j - 1].type = BOX;
        gBoard[i][j].type = SOKOBAN;
        gBoard[i][j + 1].type = FLOOR;
    } else if (gBoard[i][j].type === FLOOR) {
        gBoard[i][j].type = SOKOBAN;
        gBoard[i][j + 1].type = FLOOR;
    }
    gStepCount++;
    renderBoard(gBoard);
}
function moveRight(i, j) {
    console.log('mooving right')
    if (gBoard[i][j].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i][j + 1].type === WALL) return;
    else if (gBoard[i][j].type === BOX && gBoard[i][j + 1].type === BOX) return;
    else if (gBoard[i][j].type === BOX && gBoard[i][j + 1].type !== WALL) {
        gBoard[i][j + 1].type = BOX;
        gBoard[i][j].type = SOKOBAN;
        gBoard[i][j - 1].type = FLOOR;
    } else if (gBoard[i][j].type === FLOOR) {
        gBoard[i][j].type = SOKOBAN;
        gBoard[i][j - 1].type = FLOOR;
    }
    gStepCount++;
    renderBoard(gBoard);
}

function checkWin() {
    if (gBoard[3][2].type === BOX && gBoard[3][3].type === BOX && gBoard[3][4].type === BOX) {
        clearInterval(timeInterval);
        document.querySelector('.board').innerHTML = '<img src="img/winner.jpg">';
    }
}


function timer() {
    document.querySelector('.time').innerHTML = (((Date.now() - gStartTime) / 1000));
    document.querySelector('.stepCount').innerHTML = gStepCount;
}

function resetGame() {
    clearInterval(timeInterval);
    timeInterval = null;
    gStartTime = null;
    gStepCount = 0;
    initGame();
}


function goBack() {
    window.history.back();
}
