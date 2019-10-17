'use strict';

var gCurrLang = 'en';
var gTrans = {
    en: {
        header: 'Welcome to my bookshop',
        id: 'Id',
        title: 'Title',
        price: 'Price',
        actions: 'Actions',
        about: 'About Book',
        update: 'Update Book Price',
        delete: 'Delete Book',
        add: 'Add New Book',
        sureP: 'Are you sure?',
        nameP: 'Book Name?',
        priceP: 'Book Price?',
        imgP: 'img src?',
        noName:'Please enter the book name!',
        noPrice:'Please enter a valid book price!',
        noImg:'Please enter the Img src!'
    },
    he: {
        header: 'חנות הספרים שלי',
        id: 'מזהה',
        title: 'שם הספר',
        price: 'מחיר',
        actions: 'פעולות',
        about: 'עוד פרטים',
        update: 'עדכן מחיר',
        delete: 'מחק ספר',
        add: 'הוסף ספר חדש',
        sureP: 'בדוק?',
        nameP: 'שם הספר?',
        priceP: 'מחיר?',
        imgP: ' כתובת לתמונת הספר?',
        noName:'אין ספר ללא שם!',
        noPrice:'אני לא מסכים לחלק ספרים בחינם!',
        noImg:'אין תמונה?!'
    },
    es: {
        header: 'bienvenido a mi librería',
        id: 'Id',
        title: 'Titulo del libro',
        price: 'precio',
        actions: 'comportamiento',
        about: 'acerca del libro',
        update: 'actualizar el precio ',
        delete: 'eliminar libro',
        add: 'agregar nuevo libro',
        sureP: 'Estás seguro?',
        nameP: 'nombre del libro?',
        priceP: 'precio de libro?',
        imgP: 'fuente img?',
        noName: '¡Ingrese el nombre del libro!',
        noPrice:'¡Ingrese un precio de libro válido!',
        noImg: '¡Ingrese el Img src!'
    }
}

function setLang(lang) {
    gCurrLang = lang;
}

function getLang() {
    return gCurrLang;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        if (transKey != 'bookPrice') {
            var txt = getTrans(transKey);
            el.innerText = txt;
        }

    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[gCurrLang];
    var txt = keyTrans[transKey];
    if (!txt) txt = gTrans[en][txt];
    return txt;
}

function formatCurrency(num) {
    console.log(typeof num)
    console.log('num is', num)
    if (gCurrLang === 'es') {
        return new Intl.NumberFormat('eu-EU', {
            style: 'currency',
            currency: 'EUR'
        }).format(num);
    } else if (gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL', {
            style: 'currency',
            currency: 'ILS'
        }).format(num);
    } else {
        num = Number(num);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num);
    }
}