// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;
var cardProcessing = 0;


// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 12;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');


// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioRight = new Audio('sound/right.mp3');
var audioWrong = new Audio('sound/wrong.mp3');


// Array file name to company name
var companiesName = ['node.js', 'Firefox', 'Opera', 'Webpack', 'Angular', 'React Native', 'vue.js', 'java', 'MongoDB', 'npm', 'Safari', 'visual studio code'];

var gCards = getNumsForCards();
render(gCards);

function render(cards) {
    var strHtmls = cards.map(function (card) {
        return `
    <section class="container">
        <div class="card" data-card="${card}" onclick="cardClicked(this)">
        <img  src="img/cards/back.png" >
        <img class="back" src="img/cards/${card}.png" >
        <p>${companiesName[card-1]}</p>
        </div>
    </section>        
        `
    })
    document.querySelector('.board').innerHTML = strHtmls.join('\n')
    shuffle();
}


function shuffle() {
    var board = document.querySelector('.board');
    for (var i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.random() * i | 0]);
    }
}


// This function is called whenever the user click a card
function cardClicked(elCard) {

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
        } else {
            // get the data-card attribute's value from both cards
            var card1 = elPreviousCard.getAttribute('data-card');
            var card2 = elCard.getAttribute('data-card');

            // No match, schedule to flip them back in 1 second
            if (card1 !== card2) {
                setTimeout(function () {
                    elCard.classList.remove('flipped');
                    elPreviousCard.classList.remove('flipped');
                    elPreviousCard = null;
                    cardProcessing = 0;
                }, 1000)
                audioWrong.play();

            } else {
                // Yes! a match!
                flippedCouplesCount++;
                elPreviousCard = null;
                cardProcessing = 0;
                audioRight.play();


                // All cards flipped!
                if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                    audioWin.play();
                }
            }
        }
    }
}

function getNumsForCards() {
    return [...Array(TOTAL_COUPLES_COUNT).keys()]
        .map(i => i + 1)
        .concat([...Array(TOTAL_COUPLES_COUNT).keys()]
            .map(i => i + 1))

}


function goBack() {
    window.history.back();
}
