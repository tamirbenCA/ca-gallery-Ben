// Global Variables
var gBalloons;
var gElBalloons;
var gGameOn;
var gIntervalTime = null;

var SKY_END = 600;


function initGame() {
    gElBalloons = document.querySelectorAll('.balloon');
    pauseGame();
    gBalloons = createBalloons();

    var sky = document.querySelector('.sky');
    var strHtml = '';
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        strHtml += '<div class="balloon" ' +
            'style="background-color:' + balloon.color + '; left:' + balloon.left + '%' + '" ' +
            'onclick="balloonClicked(this)"' +
            '></div>';
    }
    sky.innerHTML = strHtml;
}


function createBalloons() {
    var balloons = [];
    var colors = ['red', 'green', 'yellow', 'blue', 'orange', 'purple'];
    for (var i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
        var balloon = {
            color: colors[Math.floor(Math.random() * colors.length)] + '',
            bottom: 10,
            left: Math.floor(Math.random() * 90),
            speed: Math.floor(Math.random() * 7) + 2
        };
        balloons.push(balloon);
    }
    return balloons;
}


// function createBalloons() {
//     var balloons = [];
//     var colors = ['red' , 'green', 'yellow', 'blue', 'orange'];
//     var balloon1 = { color: 'red', bottom: 10, left: 10, speed: 5 };
//     var balloon2 = { color: 'green', bottom: 10, left: 40, speed: 8 };
//     var balloon3 = { color: 'yellow', bottom: 10, left: 70, speed: 2 };
//     balloons.push(balloon1);
//     balloons.push(balloon2);
//     balloons.push(balloon3);
//     return balloons;
// }



function startGame() {
    if (gGameOn) return;

    gGameOn = true;
    var elBalloons = document.querySelectorAll('.balloon');

    gIntervalTime = setInterval(function () {
        // move all balloons
        for (var i = 0; i < elBalloons.length; i++) {
            var elBalloon = elBalloons[i];
            var balloon = gBalloons[i];
            balloon.bottom += balloon.speed;
            elBalloon.style.bottom = balloon.bottom + 'px';

            if (balloon.bottom >= SKY_END) {
                pauseGame();
            }
        }
    }, 100);
}

function pauseGame() {
    gGameOn = false;
    if (gIntervalTime) {
        clearInterval(gIntervalTime);
        gIntervalTime = null;
    }
}

function balloonClicked(elBalloon) {
    var audioPop = new Audio('sound/pop.mp3')
    if (gGameOn) {
        elBalloon.classList.add('popped');
        audioPop.play();
    }
}

function goBack() {
    window.history.back();
}