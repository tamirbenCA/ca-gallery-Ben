var gPacman;
var PACMAN = 'ᗤ';


function createPacman(board) {
  gPacman = {
    location: {
      // i: 3,
      // j: 5
      i: 7,
      j: 10
    },
    isSuper: false,
    color: 'yellow',
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {

    case 'ArrowUp':
      //console.log('Arrow Up!');
      nextLocation.i--;
      break;
    case 'ArrowDown':
      //console.log('Arrow Down!');
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      //console.log('Arrow Left!');
      nextLocation.j--;
      break;
    case 'ArrowRight':
      //console.log('Arrow Right!');
      nextLocation.j++;
      break;
  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
    gState.foodCount--
    checkFoodCount();
  }

  if (nextCell === SUPERFOOD) {
    updateScore(5);
    gState.foodCount--
    gPacman.isSuper = true;
    setTimeout(function () {
      gPacman.isSuper = false;
      generateGhosts();
    }, 5000)
    checkFoodCount();
  }

  // TODO: add support for power-food
  var isGameOver = checkEngage(nextCell, GHOST, nextLocation);
  if (isGameOver) return;

  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // render updated model to the DOM
  if (gPacman.isSuper) {
    renderCell(gPacman.location, PACMAN, 'red');
  } else renderCell(gPacman.location, PACMAN, gPacman.color);
}


function checkFoodCount() {
  if (gState.foodCount === 1) {
    var elGameOver = document.querySelector('.gameOverText')
    elGameOver.innerText = 'You Won!'
    var elImage = document.querySelector('.gameOverImage');
    elImage.innerHTML = '<img src="img/pac-man.png" class="image">';
    gameOver();
  }
}