var gProjects = [];

function initPage() {

    gProjects = [
        {
            id: 1,
            name: 'monsterMemory',
            title: 'Monster Memory Game',
            desc: 'Play card-monster memory game',
            descL: 'My enrolling project for Coding Academy. 8 pairs of cards. Can you remember them all?',
            date: 'September 2017',
            category: 'Games'
        },
        {
            id: 2,
            name: 'balloonPop',
            title: 'Balloon Pop',
            desc: 'Pop all balloons as fast as you can',
            descL: 'How quick can you be with the mouse? Pop all the balloons as fast as you can. There is no two games alike. Every game the balloons will appear in different places and speeds.',
            date: 'October 2017',
            category: 'Games'
        },
        {
            id: 3,
            name: 'guessNum',
            title: 'Guess My Number',
            desc: 'Guess the computer\'s number with too-high / too-low hints',
            descL: 'The computer thinks of a number. The player needs to guess it with only "too-high" or "too-low" hints.',
            date: 'October 2017',
            category: 'Games'
        },
        {
            id: 4,
            name: 'inPicture',
            title: 'What\'s in the pic',
            desc: 'Two sentences, which one is true for the picture?',
            descL: 'One picture, two sentences. Which one describe the picture in better way?',
            date: 'October 2017',
            category: 'Games'
        },
        {
            id: 5,
            name: 'touchNums',
            title: 'Touch Nums',
            desc: 'Clear the board in the right numerical order as fast as you can',
            descL: 'Choose the board size and try to clear all tiles in the right numerical order as fast as you can.',
            date: 'October 2017',
            category: 'Games'
        },
        {
            id: 6,
            name: 'minesweeper',
            title: 'Minesweeper',
            desc: 'Play the classic minesweeper game, try not to get BOMBED',
            descL: 'The classic game first introduce in Windows 3.1. Coding Academy Sprint 1 project. Try the hardest level inwhich you have 8 * 8 board and 15 mines.',
            date: 'November 2017',
            category: 'Games'
        },
        {
            id: 7,
            name: 'sokoban',
            title: 'Sokoban',
            desc: 'Can you solve the Sokoban puzzle and put all the boxes on targets?',
            descL: 'Play the hard-working Warehouse Manager and move all the crates to the target-places. The second project in Coding Academy Sprint 1.',
            date: 'November 2017',
            category: 'Games'
        },
        {
            id: 8,
            name: 'simon',
            title: 'Simon Memory Game',
            desc: 'Another classic memory game. Don\'t blink so you won\'t miss the next color!',
            descL: 'Memory game where you cannot blink so you won\'t miss the next sequenced color. Play until you lose.',
            date: 'November 2017',
            category: 'Games'
        },
        {
            id: 9,
            name: 'calcu',
            title: 'Calculator',
            desc: 'Never knew what 1 + 1 is equal to? You can also know the answer in Binary',
            descL: 'Basic calculator with a twist: One can change the base of the result to Decimal (base 10), Binary (base 2), Octal (base 8) or Hexadecimal (base 16).',
            date: 'November 2017',
            category: 'Misc Apps'
        },
        {
            id: 10,
            name: 'bookShop',
            title: 'Books R Us',
            desc: 'Manage books interface for the book-shop-owener',
            descL: 'Web page with a list of books. One can edit the price, delete the entry, add new item, sort the list and many more valuable options.',
            date: 'November 2017',
            category: 'Web Page'
        },
        {
            id: 11,
            name: 'guessMe',
            title: 'Guess Me',
            desc: 'Akinator game. Think of a person and the computer will try to guess him / her',
            descL: 'Akinator game is very like the game \'20 Questions\' where the computer guess a person the player is thinking on. This project was build with jQuery.',
            date: 'November 2017',
            category: 'Games'
        },
        {
        id: 12,
        name: 'memoryLogos',
        title: 'Dev Logos Memory',
        desc: 'Play Dev-Companies card memory game',
        descL: 'Card memory game based on the enrolling "monsterMemory" project. This project was for practicing flexbox.',
        date: 'November 2017',
        category: 'Games'
        },
        {
        id: 13,
        name: 'misterBlooger',
        title: 'Mister Blooger Webpage',
        desc: 'Build a webpage from .psd file using CSS only (no JS)',
        descL: 'A project to build a webpage from a .psd file using flexbox and CSS.',
        date: 'November 2017',
        category: 'Web Page'
        },
        {
        id: 14,
        name: 'todos',
        title: 'Todo task reminder',
        desc: 'Todo task where one can orginize all his duties and reminders.',
        descL: 'Added options to orginize the tasks (all, active, done), add new tasks and delete old ones.',
        date: 'November 2017',
        category: 'Misc Apps'
        },
        {   
        id: 15,
        name: 'pacman',
        title: 'Pacman Calassic Game',
        desc: 'Classic Pacman game, can you clear the board without the ghosts catch you?',
        descL: 'Pacman game build on matrix model, we had to continue a started project with several files.',
        date: 'November 2017',
        category: 'Games'
        },
        {
        id: 16,
        name: 'memeGenerator',
        title: 'Meme generator',
        desc: 'Meme Generator. responsive',
        descL: 'The 2nd sprint of CA course. Team of twos where we have been asked to build a functional Meme Generator app works both on desktop machine and mobile, includes upload your own photo and download the result.',
        date: 'November 2017',
        category: 'Web Page'
        },
        {
        id: 17,
        name: 'wikiTube',
        title: 'Wiki Tube',
        desc: 'The ultimate cross-search engine for YouTube & Wikipedia. responsive',
        descL: 'Lorem....',
        date: 'November 2017',
        category: 'Web Page'
        },
        {
        id: 18,
        name: 'travelTip',
        title: 'Travel Tip',
        desc: 'Goole Map meets Open Weather. All in one page: Position Location, Weather at position, Search places on the map. responsive',
        descL: 'Lorem....',
        date: 'November 2017',
        category: 'Web Page'
        },
        
    ]
    renderGallery();
}


function renderGallery() {
    for (var i = gProjects.length-1; i >= 0; i--) {
        var strHtml = '';
        strHtml += '<div class="col-md-4 col-sm-6 portfolio-item">' +
            ' <a class="portfolio-link" data-toggle="modal" onclick="renderModal(' + i + ')" href="#portfolioModal"> ' +
            ' <div class="portfolio-hover"> ' +
            ' <div class="portfolio-hover-content"> ' +
            ' <i class="fa fa-plus fa-3x"></i> ' +
            ' </div> ' +
            ' </div> ' +
            ' <img class="img-fluid" src="img/portfolio/' + gProjects[i].id + '-thumb.jpg" > ' +
            ' </a> ' +
            ' <div class="portfolio-caption"> ' +
            ' <h4>' + gProjects[i].title + '</h4> ' +
            ' <p class="text-muted">' + gProjects[i].desc + '</p> ' +
            ' </div> ' +
            '</div> ';
        var elMat = document.querySelector('#my-portfolio');
        elMat.innerHTML += strHtml;
    }
}

function renderModal(i) {
    var strHtml = '';
    var elPortfolioModal = document.querySelector('#portfolioModal');
    strHtml += '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="close-modal" data-dismiss="modal">' +
        '<div class="lr">' +
        '<div class="rl"></div>' +
        '</div>' +
        '</div>' +
        '<div class="container">' +
        '<div class="row">' +
        '<div class="col-lg-8 mx-auto">' +
        '<div class="modal-body">' +
        '<!-- Project Details Go Here -->' +
        '<h2>' + gProjects[i].title + '</h2>' +
        '<img class="img-fluid" src="img/portfolio/' + gProjects[i].id + '.jpg" >' +
        '<p>' + gProjects[i].descL + '</p>' +
        '<ul class="list-inline">' +
        '<li>Date: ' + gProjects[i].date + '</li>' +
        '<li>Client: Coding Academy</li>' +
        '<li>Category: ' + gProjects[i].category + '</li>' +
        '</ul>' +
        '<br>' +
        '<a href="projects/' + gProjects[i].name + '/' + 'index.html" class="btn btn-success active" role="button" aria-pressed="true">Run This Project</a>' +
        '<br><br>' +
        '<button class="btn btn-primary" data-dismiss="modal" type="button">' +
        '<i class="fa fa-times"></i>' +
        'Close Project</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    elPortfolioModal.innerHTML = strHtml;
}


function contactMe(event) {
    event.preventDefault();
    var strSub = document.querySelector('#SUBJECT').value;
    var strBody = document.querySelector('#BODY').value;

    window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=tamirben@gmail.com&su=' + strSub + '&body=' + strBody
    );
}