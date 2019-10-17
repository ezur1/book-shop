'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTMLs = '<table class="books-tbl"><tbody><tr><td data-trans="id">id</td><td data-trans="title">Title</td><td data-trans="price">Price</td><td colspan="3" data-trans="actions">Actions</td></tr>';
    var booksHTMLs = books.map(function (book) {
        return `<tr><td>${book.id}</td>
                    <td>${book.name}</td>
                    <td data-trans="bookPrice">${formatCurrency(book.price)}</td>
                    <td><button data-trans='about' onclick="showModal('${book.name}','${book.price}',${book.rate},${book.id},'${book.img}')" title="About this Book" class="btn">About Book</button></td>
                    <td><button data-trans='update' onclick="readAndUpdateBook(${book.id})" title="Remove this Book" class="btn">Update Book Price</button></td>
                    <td><button data-trans='delete' onclick="onDeleteBook(${book.id})" title="Remove this Book" class="btn">Delete Book</button></td>
                </tr>`
    });
    strHTMLs += booksHTMLs.join('') + '</tbody></table></div>';
    console.log(strHTMLs);
    document.querySelector(".books-container").innerHTML = strHTMLs;
    doTrans();
}

function onDeleteBook(bookId) {
    var isSure = confirm(getTrans('sureP'));
    if (!isSure) return;
    removeBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var name = prompt(getTrans('nameP'));
    if(!name){alert(getTrans('noName'));return;}
    var price = prompt(getTrans('priceP'));
    if(!price){alert(getTrans('noPrice'));return;}
    var imgSrc = prompt(getTrans('imgP'));
    if(!imgSrc){alert(getTrans('noImg'));return;}
    addBook(name, price, imgSrc);
    renderBooks();
}

function readAndUpdateBook(bookId) {
    var bookPrice = prompt(getTrans('priceP'));
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
    document.querySelector('.modal').style.display = 'none';
}

function onSetLang(lang){
    setLang(lang);
    if(lang==='he')document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
    renderBooks();
}