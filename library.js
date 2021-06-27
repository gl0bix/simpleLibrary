let myLibrary = [];

const form = document.querySelector('#inputForm');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const submit = document.querySelector('#submit');
const save = document.querySelector('#save');
const refresh = document.querySelector('#refresh');

const libraryDiv = document.querySelector('#library')

let ID = 0;

const Book = {
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
    },
    toggleRead: function(){
        this.read = !this.read;
    }
}

function addBook(e) {
    e.preventDefault();
    const newBook = Object.create(Book).init(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.value === 'on' ? true : false
    );

    myLibrary.push(newBook);
    alert('Book successfully added!');
    form.reset();
    displayBooks();
}

// TODO: rather use createElement

function displayBooks() {
    
    while(libraryDiv.firstChild) libraryDiv.removeChild(libraryDiv.firstChild);

    const table = document.createElement("table");
    table.setAttribute("class", "library-table");
    table.setAttribute("class", "library-table");
    table.setAttribute("id", "library-table");

    //define table head
    const tableHead = document.createElement("tr");
    const headID = document.createElement("th");
    headID.textContent = 'ID';
    const headTitle = document.createElement("th");
    headTitle.textContent = 'Title';
    const headAuthor = document.createElement("th");
    headAuthor.textContent = 'Author';
    const headPages = document.createElement("th");
    headPages.textContent = 'Pages';
    const headRead = document.createElement("th");
    headRead.textContent = 'Read?';

    tableHead.appendChild(headID);
    tableHead.appendChild(headTitle);
    tableHead.appendChild(headAuthor);
    tableHead.appendChild(headPages);
    tableHead.appendChild(headRead);
    table.appendChild(tableHead);

    //define table rows

    myLibrary.forEach((el) => {
        let bookRow = document.createElement("tr");
        bookRow.setAttribute("data-id", `${el.id}`);

        const rowID = document.createElement("td");
        rowID.textContent =`${el.id}`;
        const rowTitle = document.createElement("td");
        rowTitle.textContent = `${el.title}`;
        const rowAuthor = document.createElement("td");
        rowAuthor.textContent = `${el.author}`;
        const rowPages = document.createElement("td");
        rowPages.textContent = `${el.pages}`;
        const rowRead = document.createElement("td");
        const rowReadButton = document.createElement("button");
        rowReadButton.textContent = `${el.read}`;
        rowReadButton.setAttribute("class", "button read-button");
        rowReadButton.setAttribute("data-id", `${el.id}`);
        rowRead.appendChild(rowReadButton);

        bookRow.appendChild(rowID);
        bookRow.appendChild(rowTitle);
        bookRow.appendChild(rowAuthor);
        bookRow.appendChild(rowPages);
        bookRow.appendChild(rowRead);

        table.appendChild(bookRow);
    });

    libraryDiv.appendChild(table);

    let readButtons = document.querySelectorAll(".read-button");

    readButtons.forEach((e) => {
        e.addEventListener("click", () => {
            myLibrary.find(book => book.id === parseInt(e.getAttribute("data-id"))).toggleRead();
            displayBooks();
        })
    });
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