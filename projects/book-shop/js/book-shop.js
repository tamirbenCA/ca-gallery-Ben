'use strict'

var gBooks = [
    {
        id: 1,
        name: 'Big Cat Small Cat',
        price: 79,
        year: 2009,
        author: 'Ami Robinger',
        desc: 'An interactive, full color book about cats of all sizes, shapes and dispositions, Big Cat, Small Cat introduces children to rhyming and opposites in a fun and engaging way.',
        // cover: 'bigCatSmallCat',
        rating: 0
    },
    {
        id: 2,
        name: 'Harry Potter and the Sorcerer\'s Stone',
        price: 69,
        year: 1999,
        author: 'J.K. Rowling',
        desc: 'Harry Potter has no idea how famous he is. That\'s because he\'s being raised by his miserable aunt and uncle who are terrified Harry will learn that he\'s really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny.',
        // cover: 'harryPotter1',
        rating: 0
    },
    {
        id: 3,
        name: 'Percy Jackson and The Lightning Thief',
        price: 85,
        year: 2006,
        author: 'Rick Riordan',
        desc: 'After getting expelled from yet another school for yet another clash with mythological monsters only he can see, twelve-year-old Percy Jackson is taken to Camp Half-Blood, where he finally learns the truth about his unique abilities: He is a demigod, half human, half immortal. Even more stunning: His father is the Greek god Poseidon, ruler of the sea, making Percy one of the most powerful demigods alive. There\'s little time to process this news. All too soon, a cryptic prophecy from the Oracle sends Percy on his first quest, a mission to the Underworld to prevent a war among the gods of Olympus.',
        // cover: 'precyJackson1',
        rating: 0
    },
    {
        id: 4,
        name: 'JavaScript For Dummies',
        price: 129,
        year: 2004,
        author: 'Emily A. Vander Veer',
        desc: 'Explains JavaScript and how it differs from java, HTML, and other Web programming tools. Describes what users can do with JavaScript that they can\'t do with HTML. Outlines how JavaScript, the platform-independent scripting language, works with the latest versions of Netscape Navigator 5 and Microsoft Internet Explorer 5.5. Includes an important overview of Object-Oriented Concepts and the JavaScript language. Shows users how to "team up" JavaScript with Java, C++, OpenDoc, and Common Gateway Interface (CGI) to create powerful multimedia applications. Describes how to build a quickie Web page using HTML tags. Shows users how to create a Java applet and run the applet from the Web page. Covers JavaScript\'s forms so users can easily enter data and receive feedback. Guides users as they write and debug their own JavaScript programs.',
        // cover: 'jsForDummies',
        rating: 0
    },
    {
        id: 5,
        name: 'Israel for Beginners: A Field Guide for Encountering the Israelis in Their Natural Habitat',
        price: 99,
        year: 2011,
        author: 'Angelo Colorni',
        desc: 'This guide, based on first-hand, day-by-day survival of over three decades in Israel, will help you to first understand, then gradually accept, and eventually almost conform to the Israeli mentality, which in turn will enable you to first look like, then gradually behave like, and eventually almost become a real Israeli. With tongue firmly in cheek, the author takes some affectionate, punning jabs at his adoptive homeland\'s language, people, lifestyle, and land.',
        // cover: 'israelForBeginners',
        rating: 0
    }
];

function initPage() {
    renderBooks();
}


function renderBooks() {
    var elTable = document.querySelector('.books-list');

    var strHtml = '';
    for (var i = 0; i < gBooks.length; i++) {
        strHtml += '<tr>' +
            '<th scope="row">' + (i + 1) + '</th>' +
            '<td>' + gBooks[i].name + '</td>' +
            '<td>' + gBooks[i].price + '</td>' +
            '<td> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#bookModal" onclick="bookInfo(' + i + ')">More Info</button>' +
            ' <button type="button" class="btn btn-warning" onclick="updateBook(' + i + ')">Update</button>' +
            ' <button type="button" class="btn btn-danger" onclick="deleteBook(' + i + ')">Delete</button> </td>' +
            '</tr>';
    }
    elTable.innerHTML = strHtml;
}


function deleteBook(bookId) {
    gBooks.splice(bookId, 1);
    renderBooks();
}

function updateBook(bookId) {
    var newPrice = prompt('Updated price for ' + gBooks[bookId].name);
    gBooks[bookId].price = newPrice;
    renderBooks();
}

function bookInfo(bookId) {
    var elBookModal = document.querySelector('#bookModal')
    var strHtml = '';


    strHtml += '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">' + gBooks[bookId].name + '</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<img class="img-fluid" src="img/' + gBooks[bookId].id + '.jpg" >' +
        '<p><b>Author: </b>' + gBooks[bookId].author + '</p>' +
        '<p><b>Year published: </b>' + gBooks[bookId].year + '</p>' +
        '<p><b>Description: </b>' + gBooks[bookId].desc + '</p>' +
        '<button type="button" class="btn btn-danger fa fa-thumbs-down" onclick="addRating(false,' + bookId + ')"></button>' +
        '<span class="ratingCounter"> ' + gBooks[bookId].rating + ' </span>' +
        '<button type="button" class="btn btn-success fa fa-thumbs-up" onclick="addRating(true,' + bookId + ')"></button>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        '</div>' +
        '</div>' +
        '</div>';

    elBookModal.innerHTML = strHtml;
}


function addRating(status, bookId) {
    if (status && gBooks[bookId].rating < 10) {
        gBooks[bookId].rating++;
    }
    else if (!status && gBooks[bookId].rating > 0) {
        gBooks[bookId].rating--;
    }

    var elCount = document.querySelector('.ratingCounter');
    elCount.innerHTML = ' ' + gBooks[bookId].rating + ' ';
}



function addNewBook() {
    var elNewBookModal = document.querySelector('#addBookModal')
    // var newBook = {};

    var strHtml = '';
    strHtml += '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="addBookModal">Add new book</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        'Book title: <input type="text" class="form-control" id="newName">' +
        'Book price: <input type="text" class="form-control" id="newPrice">' +
        'Author: <input type="text" class="form-control" id="newAuthor">' +
        'Year published: <input type="text" class="form-control" id="newYear">' +
        'Description: <input type="text" class="form-control" id="newDesc">' +
        // 'Cover pic name: <input type="text" class="form-control" id="newCover">' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        '<button type="button" class="btn btn-primary" onclick="saveBook()" data-dismiss="modal">Save changes</button>' +
        '</div>' +
        '</div>' +
        '</div>';

    elNewBookModal.innerHTML = strHtml;
}


function saveBook() {
    console.log('saving');
    var newBook = {};

    var nameElement = document.querySelector('#newName');
    newBook.name = nameElement.value;
    var priceElement = document.querySelector('#newPrice');
    newBook.price = priceElement.value;
    var yearElement = document.querySelector('#newYear');
    newBook.year = yearElement.value;
    var authorElement = document.querySelector('#newAuthor');
    newBook.author = authorElement.value;
    var descElement = document.querySelector('#newDesc');
    newBook.desc = descElement.value;
    // var coverElement = document.querySelector('#newCover');
    // newBook.cover = coverElement.value;
    newBook.rating = 0;
    newBook.id = (gBooks.length + 1);

    gBooks.push(newBook);
    renderBooks();
}



function sortBy(index) {
    switch (index) {
        case 'name':
        for (var a = 0; a < gBooks.length - 1; a++) {
            for (var b = a + 1; b < gBooks.length; b++) {
                if (gBooks[a].name > gBooks[b].name) {
                    var temp = gBooks[b];
                    gBooks[b] = gBooks[a];
                    gBooks[a] = temp;
                }
            }
        }
        break;

        case 'price':
        for (var a = 0; a < gBooks.length - 1; a++) {
            for (var b = a + 1; b < gBooks.length; b++) {
                if (gBooks[a].price > gBooks[b].price) {
                    var temp = gBooks[b];
                    gBooks[b] = gBooks[a];
                    gBooks[a] = temp;
                }
            }
        }
        break;

    }
    renderBooks();        
} 


function goBack() {
    window.history.back();
}


// function addNewBook() {
    //     var newBook = {};
    //     newBook.name = prompt('Book title:');
    //     newBook.price = prompt('Price:');
    //     newBook.year = prompt('Year published:');
    //     newBook.author = prompt('Author name:');
    //     newBook.desc =  prompt('Short description');
    //     newBook.cover = prompt('Cover photo name in folder');
    
    //     gBooks.push(newBook);
    //     renderBooks();
    // }
    

    // function sortByName() {
    //     console.log('sorting')
    //     for (var a = 0; a < gBooks.length - 1; a++) {
    //         for (var b = a + 1; b < gBooks.length; b++) {
    //             if (gBooks[a].name > gBooks[b].name) {
    //                 var temp = gBooks[b];
    //                 gBooks[b] = gBooks[a];
    //                 gBooks[a] = temp;
    //             }
    //         }
    //     }
    //     renderBooks();
    // }
    
    
    // function sortByPrice() {
    //     console.log('sorting')
    //     for (var a = 0; a < gBooks.length - 1; a++) {
    //         for (var b = a + 1; b < gBooks.length; b++) {
    //             if (gBooks[a].price > gBooks[b].price) {
    //                 var temp = gBooks[b];
    //                 gBooks[b] = gBooks[a];
    //                 gBooks[a] = temp;
    //             }
    //         }
    //     }
    //     renderBooks();
    // }