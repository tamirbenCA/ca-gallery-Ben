'use strick'

var gRightSeq = [];
var gCurrClick = 0;
var gCurrComputerTurn = 0;


function initGame() {
    gRightSeq = [];
    gCurrClick = 0;
    computerTurn();
}


function computerTurn() {
    var chance = Math.random();
    var nextColor = '';
    if (chance < 0.25) nextColor = 'red';
    else if (chance < 0.5) nextColor = 'yellow';
    else if (chance < 0.75) nextColor = 'blue';
    else nextColor = 'green';

    gRightSeq.push(nextColor);
    console.log(gRightSeq);
    gTimeOut = setTimeout(playNextComputerTurn, 1000);
    gCurrClick = 0;
}


function playerTurn(userColor) {
    if (userColor === gRightSeq[gCurrClick]) {
        gCurrClick++;
        console.log('well done')
    }
    else gameOver();

    if (gRightSeq.length === gCurrClick) computerTurn();
}


function playNextComputerTurn() {
    console.log(gRightSeq[gCurrComputerTurn])
    blink(gRightSeq[gCurrComputerTurn]);
    gCurrComputerTurn++;
    
    if (gCurrComputerTurn < gRightSeq.length) {
        setTimeout(playNextComputerTurn, 1000);
    } else {
        setTimeout(clearMarks, 1000)
        gCurrComputerTurn = 0;
    }
}


function blink(selector) {
    clearMarks()
    var elButton = document.querySelector('.' + selector);
    setTimeout(function (){
        elButton.classList.add('mark');
    }, 200)
}

function clearMarks () {
    elButtons = document.querySelectorAll('.button')
    for (var i = 0; i < elButtons.length; i++) {
        elButtons[i].classList.remove('mark');
    }
}

function gameOver() {
    alert('Game Over');
}



function goBack() {
    window.history.back();
}
