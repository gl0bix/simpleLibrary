let myLibrary = [];

const form = document.querySelector('#inputForm');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const submit = document.querySelector('#submit');
const save = document.querySelector('#save');
const refresh = document.querySelector('#refresh');

let table = document.querySelector('#library-table');

let ID = 0;

const Book = {

    //include shared variable for id

    init: function (title, author, pages, read) {
        this.id = ID++;
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
    //fix double entries
    let result = `
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read?</th>
    </tr>`;
    myLibrary.forEach((el) => {
        result += `
        <tr data-id="${el.id}"> 
            <td>${el.id}</td>
            <td>${el.title}</td> 
            <td>${el.author}</td> 
            <td>${el.pages}</td> 
            <td><input type="checkbox" ${el.read}? checked: ></td>
        </tr>`
    })
    table.innerHTML = result;
}

function saveLibrary(){
    // save books in online storage
}


form.addEventListener('submit', addBook);
refresh.addEventListener('click', displayBooks);
save.addEventListener('click', saveLibrary);

myLibrary.push(Object.create(Book).init("The Hobbit", "J.R.R Tolkien", 200, true));
myLibrary.push(Object.create(Book).init("Dune", "Frank Herbert", 300, false));
myLibrary.push(Object.create(Book).init("Eragon", "Christopher Paolini", 600, true));
displayBooks();