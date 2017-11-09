'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);


function init() {
    var questsTree = getLocalStorage();

    if (questsTree) {
        gQuestsTree = questsTree;
        gCurrQuest = gQuestsTree;
    } else {
        gQuestsTree = createQuest('Male');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gCurrQuest = gQuestsTree;
    }
}


function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide();
    renderQuest();
}


function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest').show();
    $('.gameQuest > h2').text(gCurrQuest.txt);
}


function userResponse(res) {
    // If this node has no children
    if (gCurrQuest.yes === null) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            restartGame();
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show gameNewQuest section
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        gLastRes = res;
        gCurrQuest = gPrevQuest[res];
        renderQuest();
    }
}


function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    var newQuest = createQuest($('#newQuest').val());
    newQuest.yes = createQuest($('#newGuess').val());
    newQuest.no = gPrevQuest[gLastRes];
    gPrevQuest[gLastRes] = newQuest;
    updateLocalStorage();
    restartGame();
}


function createQuest(txt) {
    return {
        txt: txt + '?',
        yes: null,
        no: null
    }
}


function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}


function updateLocalStorage() {
    window.localStorage.setItem('QuestsTree', JSON.stringify(gQuestsTree));
}

function getLocalStorage() {
    return JSON.parse(window.localStorage.getItem('QuestsTree'));
}


function goBack() {
    window.history.back();
}