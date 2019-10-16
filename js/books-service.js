'use strict';

const BOOKS_KEY = 'books';
var gBooks;
var gNextId = 101;
createBooks();
console.log(gBooks);


function createBooks() {
    var books = loadCarsFromStorage();
    if (!books || books.length === 0) {
        books = [createBook('Harry Potter and the Goblet of Fire', '28.79$', 'img/Harry-Potter.jpg'), createBook('The Vine Witch', '10.95$', 'img/The-Vine-Witch.jpg'),
            createBook('The Very Hungry Caterpillar', '9.99$', 'img/The-Very-Hungry-Caterpillar.jpg')
        ];
    }
    gBooks = books;
    saveBooksToStorage();
}

function createBook(name, price, imgUrl) {
    return {
        id: gNextId++,
        name: name,
        price: price,
        img: imgUrl,
        rate: 0
    }
}

function getBooks() {
    return gBooks;
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    });
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage();
}

function addBook(name, price, imgSrc) {
    var book = createBook(name, price, imgSrc);
    gBooks.unshift(book);
    saveBooksToStorage();
}

function updateBook(bookId, bookPrice) {
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    if (!book) return;
    book.price = bookPrice + '$';
    saveBooksToStorage();
}

function updateRate(bookId, rate) {
    var id = Number(bookId);
    var book = gBooks.find(function (book) {
        return id === book.id;
    });
    if (book.rate >= 0 && book.rate <= 10) book.rate += rate;
    if(book.rate<0)book.rate = 0;
    if(book.rate>10)book.rate = 10;
    saveBooksToStorage();
    return book;
}

function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function loadCarsFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}