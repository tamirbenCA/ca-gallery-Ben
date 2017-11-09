// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;
var startTime = 0;
var endTime = 0;
var bestTime = 0;
var cardProcessing = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 8;

function bigImg(x) {
    x.style.height = "300px";
    x.style.width = "300px";
}

function normalImg(x) {
    x.style.height = "100px";
    x.style.width = "100px";
}

// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioRight = new Audio('sound/right.mp3');
var audioWrong = new Audio('sound/wrong.mp3');

function whoIs(name) {
var storageName = localStorage.getItem('name');
var name = prompt("Please enter your name", storageName);
if (name != null) {
    localStorage.setItem('name', name);
    alert("Hello " + name);
}
}


function playAgain () {
    var answer = confirm("Play again?");
    if (answer == true) {
        newGame();
    } else {
        return;
    }
}

function newGame() {
    startTime = 0;
    endTime = 0;
    flippedCouplesCount = 0;
    var divs = document.querySelectorAll('.card'); for (var i = 0; i < divs.length; ++i) { divs[i].classList.remove('flipped');
    }
    shuffle();
} 

function shuffle() {
var board = document.querySelector('.board');
for (var i = board.children.length; i>=0; i--) {
    board.appendChild(board.children[Math.random() * i | 0]);
}
}

// This function is called whenever the user click a card
shuffle();

function cardClicked(elCard) {

    if (startTime === 0) {
        startTime = Date.now();
    }
    
        // If the user clicked an already flipped card - do nothing and return from the function
        if (elCard.classList.contains('flipped')) {
            return;
        }
        
        if (cardProcessing < 2) {
            cardProcessing++;

        // Flip it
        elCard.classList.add('flipped');

        // This is a first card, only keep it in the global variable
        if (elPreviousCard === null) {
            elPreviousCard = elCard;
        } 
        else {
            // get the data-card attribute's value from both cards
            var card1 = elPreviousCard.getAttribute('data-card');
            var card2 = elCard.getAttribute('data-card');

            // No match, schedule to flip them back in 1 second
            if (card1 !== card2){
                setTimeout(function () {
                    elCard.classList.remove('flipped');
                    elPreviousCard.classList.remove('flipped');
                    elPreviousCard = null;
                    cardProcessing=0;
                }, 1000)
                //audioWrong.play();
            }
            else {
                // Yes! a match!
                flippedCouplesCount++;
                elPreviousCard = null;
                cardProcessing = 0;
                //audioRight.play();

                // All cards flipped!
                if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                //audioWin.play();
                endTime = Date.now();
                //alert (endTime-startTime);
                if (endTime-startTime < localStorage.getItem('bestTime')){
                localStorage.setItem('bestTime', endTime-startTime); var bestTime = localStorage.getItem('bestTime');
                }
            playAgain();
            }

        }

    }
    }
}



function goBack() {
    window.history.back();
}
