'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTMLs = '<table class="books-tbl"><tbody><tr><td>id</td><td>Title</td><td>Price</td><td colspan="3">Actions</td></tr>';
    var booksHTMLs = books.map(function (book) {
        return `<tr><td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.price}</td>
                    <td><button onclick="showModal('${book.name}','${book.price}',${book.rate},${book.id},'${book.img}')" title="About this Book" class="btn">About Book</button></td>
                    <td><button onclick="readAndUpdateBook(${book.id})" title="Remove this Book" class="btn">Update Book Price</button></td>
                    <td><button onclick="onDeleteBook(${book.id})" title="Remove this Book" class="btn">Delete Book</button></td>
                </tr>`
    });
    strHTMLs += booksHTMLs.join('') + '</tbody></table></div>';
    console.log(strHTMLs);
    document.querySelector(".books-container").innerHTML = strHTMLs;
}

function onDeleteBook(bookId) {
    var isSure = confirm('Are you sure?');
    if (!isSure) return;
    removeBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var name = prompt('Book name?');
    var price = prompt('Book Price?');
    var imgSrc = prompt('img src?');
    addBook(name, price, imgSrc);
    renderBooks();
}

function readAndUpdateBook(bookId) {
    var bookPrice = prompt('Book Price?');
    updateBook(bookId, bookPrice);
    renderBooks();
}

function showModal(bookName, bookPrice, bookRate,bookId,imgSrc) {
    var elModal = document.querySelector(".modal");
    var name = elModal.querySelector('h2');
    name.innerText = bookName;
    var price = elModal.querySelector('h3');
    price.innerText = bookPrice;
    var elRate = elModal.querySelector(".rate");
    elRate.innerHTML = `<button class="minus btn" 
    onclick="onRateChange('${bookId}',this)">-</button>
    <span class="book-rate">${bookRate}</span>
    <button class="plus btn" onclick="onRateChange('${bookId}',this)">+</button>`;
    var img = elModal.querySelector('img');
    img.src=imgSrc;
    elModal.style.display = 'block';
}

function onRateChange(bookId,elBtn){
    var rate;
    if(elBtn.innerText==='-')rate=-1;
    else rate=1;   
    var book = updateRate(bookId,rate);
    renderBooks();
    document.querySelector(".book-rate").innerText = book.rate;
}

function closeModal(){
    debugger;
    document.querySelector('.modal').style.display = 'none';
}