var GHOST  = 'ᗣ';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var ghost = {
        color: getRandomColor(),
        location: {
            i: 5,
            j: 10
            // i: 3,
            // j: 3
        },
        // currCellContent: FOOD  
        currCellContent: ''  
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function generateGhosts() {
    while (gGhosts.length < 3) {
        createGhost(gBoard)
    }
}


function createGhosts(board) {
  gGhosts = [];
  
  createGhost(board);
  createGhost(board);
  createGhost(board);
  
  gIntervalGhosts = setInterval(function moveGhosts(){
    
    // TODO, if there are less than 3 ghosts, create one
    
    gGhosts.forEach(function moveGhost(ghost) {
    
        var nextLocation = {
            i: ghost.location.i + getRandomIntInclusive(-1, 1),
            j: ghost.location.j + getRandomIntInclusive(-1, 1)
        }
        // console.log('nextLocation', nextLocation);
        
        if (board[nextLocation.i][nextLocation.j] === WALL) return;
        if (board[nextLocation.i][nextLocation.j] === GHOST) return;
        
        var isGameOver = checkEngage(board[nextLocation.i][nextLocation.j], PACMAN);
        if (isGameOver) {
            return;
        }
        
        
        // set back what we stepped on
        board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent, 'white');
        
        // move the ghost
        ghost.location = nextLocation;
        
        // keep the contnet of the cell we are going to
        ghost.currCellContent = board[ghost.location.i][ghost.location.j];
        
        // move the ghost model and update dom
        board[ghost.location.i][ghost.location.j] = GHOST;
        if (gPacman.isSuper === true) {
            renderCell (ghost.location, GHOST, 'blue')
        } else renderCell(ghost.location, GHOST, ghost.color);
        
    
     });
    
  }, 200);
  
}


