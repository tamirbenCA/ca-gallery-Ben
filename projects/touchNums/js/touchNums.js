'use strict'
console.log('HTML-CSS-JS proj: touch-nums: Ben Tamir')


var gLimit = +prompt('Please enter size of board game')
// var gLimit = 4;
var gNextNum = 1;
var gNumsBank = [];
var gGameBoard = [];
var gStartTime;
var gEndTime;
var gTimeRun;



playGame();


function playGame() {
    gGameBoard = createBoard();
    renderBoard(gGameBoard);
    
}


function renderBoard(board) {
    var strHtml = ''

    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            strHtml += '<td class ="tile" onclick = "tileClicked(this)">'
            strHtml += board[i][j];
            strHtml += '</td>'
        }
        strHtml += '</tr>';
    }

    var elBoard = document.querySelector('tbody')
    elBoard.innerHTML = strHtml;
}


function createBoard() {
    gNumsBank = initilizeNums();
    var board = [];
    for (var i = 0; i < gLimit; i++) {
        board[i] = [];
        for (var j = 0; j < gLimit; j++) {
            var randNum = getNum();
            board[i][j] = randNum;
        }
    }
    return board;
}


function initilizeNums() {
    for (var i = 1; i <= Math.pow(gLimit, 2); i++) {
        gNumsBank.push(i);
    }
    return gNumsBank;
}


function getNum() {
    var min = Math.ceil(0);
    var max = Math.floor(gNumsBank.length);
    var index = Math.floor(Math.random() * max);
    var getNum = gNumsBank[index];
    gNumsBank.splice(index, 1);
    return getNum;
}


function tileClicked(elTile) {
    if (+elTile.innerText === gNextNum) {
        if (gNextNum === 1) {
            gStartTime = Date.now();
            gTimeRun = setInterval(showTime, 100);
            showTime(gTimeRun); 
        }
        elTile.classList.add('flipped');
        gNextNum++;
    }
    if (gNextNum === Math.pow(gLimit, 2)+1) {
        gEndTime = Date.now() - gStartTime;
        // console.log('end time:', gEndTime/1000);
        clearInterval(gTimeRun);
        var elTimer = document.querySelector('.timer')
        elTimer.innerText = gEndTime/1000
    }
}


function showTime() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = (Date.now() - gStartTime)/1000
}



function goBack() {
    window.history.back();
}

