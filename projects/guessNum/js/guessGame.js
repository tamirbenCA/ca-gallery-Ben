'use strict';
console.log('Guess My Number (ex 26) to HTML-CSS-JS format: Ben Tamir');

var rand = (Math.floor(Math.random() * 5 + 1));

function guessGame() {
    var answer = '';
    var guess = +prompt('Guess a number, between 1 to 5');
    if (guess > rand) answer = 'Your guess it too high';
    else if (guess < rand) answer = 'Your guess is too low';
    else answer = 'Well done! Game over.'
    console.log('guess:', guess, 'answer:', answer);
    renderAnswer(guess, answer);
}


function renderAnswer(guess, answer) {
    var elAnswerArea = document.querySelector('#answerArea');
    console.log('elAnswerArea', elAnswerArea);
    var strHtml = '';

    strHtml += '<tr>\n';
    strHtml += '<tr> ' +
        '<td>' + guess + '</td>' +
        '<td>' + answer + '</td>' +
        '</tr>';

    elAnswerArea.innerHTML = strHtml;
    console.log(strHtml);
}


function goBack() {
    window.history.back();
}


console.log(rand);