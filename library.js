let myLibrary = [];

const form = document.querySelector('#inputForm');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const submit = document.querySelector('#submit');

let list = document.querySelector('#libraryList')

const Book = {
    init: function (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        return this;
    },
    info: function () {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'red it' : 'not read yet'}`);
    }
}

function addBook(e) {
    e.preventDefault();
    const newBook = Object.create(Book).init(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.value
    );

    myLibrary.push(newBook);
    alert('Book successfully added!');
    form.reset();
    displayBooks();
}

function displayBooks() {
    let result = "";
    myLibrary.forEach((el) => {
        result += `<li> ${el.title}, ${el.author} ${el.pages}, ${el.read ? 'red it' : 'not read yet'}`
    })
    list.innerHTML = result;
}

form.addEventListener('submit', addBook);