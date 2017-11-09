'use strict'
// in-picture project: Ben Tamir


var gQuestsBank = [
    { opt: ['This is a dog', 'This is a cat'], correctOptIndex: 2 },
    { opt: ['My name is Bert', 'My name is Ernie'], correctOptIndex: 1 },
    { opt: ['Best coding lang ever', 'Java what?'], correctOptIndex: 1 } ,
];

var gCurrQuestIdx = 0;

function initGame() {
    renderQuest(gCurrQuestIdx, gQuestsBank);
}


function renderQuest(currQuestIdx, questsBank) {
    var elPictureArea = document.querySelector('.picture');
    var strHtml = '';
    strHtml += '<img src="img/' + (currQuestIdx + 1) + '.jpg">';
    elPictureArea.innerHTML = strHtml;

    for (var i = 0; i < 2; i++) {
        var elButton = document.querySelector('#b' + (i+1));
        console.log(elButton);
        strHtml = '';
        strHtml += '<button onclick="checkAnswer(' + (i+1) + ')">' + questsBank[currQuestIdx].opt[i] + '</button>';
        elButton.innerHTML = strHtml;
        }

    // var elButtonOne = document.querySelector('#b1');
    // strHtml = '';
    // strHtml += '<button onclick="checkAnswer(1)">' + questsBank[currQuestIdx].opt[0] + '</button>';
    // elButtonOne.innerHTML = strHtml;

    // var elButtonTwo = document.querySelector('#b2');
    // strHtml = '';
    // strHtml += '<button onclick="checkAnswer(2)">' + questsBank[currQuestIdx].opt[1] + '</button>';
    // elButtonTwo.innerHTML = strHtml;
}


function checkAnswer(optIdx) {
    if (optIdx === gQuestsBank[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++
        if (gCurrQuestIdx >= gQuestsBank.length) {
            var elPictureArea = document.querySelector('.picture');
            var strHtml = '<img src="img/done.jpg">';
            elPictureArea.innerHTML = strHtml;
            
            var elButtons = document.querySelector('.buttons');
            elButtons.classList.add('hide');
            console.log('you won');
        } else renderQuest(gCurrQuestIdx, gQuestsBank);
    }
    else alert('Try again') //console.log('wrong');
}


function goBack() {
    window.history.back();
}
