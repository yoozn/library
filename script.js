const addEntry = document.querySelector(".add-entry");
const formClose = document.querySelector(".close-button");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".form");
const formAuthor = document.querySelector("#author");
const formTitle = document.querySelector("#title");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const confirmEntry = document.querySelector(".submit");
const libraryContainer = document.querySelector(".library-container");
// const libraryInnerContainer = document.querySelector(".library");
const removeEntryButton = document.querySelector(".remove-entry");
let libraryGrid = document.querySelector(".library-grid");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read." : "not read yet."}`;
}

function addBookToLibrary() {
    const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    myLibrary.push(newBook);
    updateLibrary();
}

function updateLibrary() {
    libraryGrid.remove();
    libraryGrid = document.createElement('div');
    libraryGrid.classList.add('library-grid');
    libraryContainer.appendChild(libraryGrid);
    for (let i=0 ; i< myLibrary.length; i++) {
        addEntryToDom(i);
    }
}

function addEntryToDom(i) {
    const book = document.createElement('div');
    book.classList.add("book");
    book.dataset.index = i;
    libraryGrid.appendChild(book);
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const readContainer = document.createElement('div');
    const readLabel = document.createElement('label');
    const readCheck = document.createElement('input');
    const remove = document.createElement('button');
    title.classList.add('b-title');
    author.classList.add('b-author');
    pages.classList.add('b-pages');
    readContainer.classList.add('read-container');
    readLabel.htmlFor = 'b-read';
    readCheck.type = 'checkbox';
    readCheck.id = 'b-read';
    // read.classList.add('b-read');
    remove.classList.add('remove-entry');
    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    readLabel.textContent = "Read";
    readCheck.checked = myLibrary[i].read;
    // read.textContent = (myLibrary[i].read == "on") ? "read" : "not read";
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readContainer);
    readContainer.appendChild(readLabel);
    readContainer.appendChild(readCheck);
    book.appendChild(remove);
    readCheck.addEventListener('input', () => {

        myLibrary[i].read = readCheck.checked;
    });
    remove.addEventListener('click', () => {
        const index = remove.parentElement.dataset.index;
        myLibrary.splice(index, 1);
        updateLibrary();
    });
    form.reset();
    console.log(myLibrary);
}

function initialize() {
    addEntry.addEventListener('click', ()=> {
        libraryContainer.style.visibility = "hidden";
        formContainer.style.visibility = "visible";
    })
    
    formClose.addEventListener('click', (e) => {
        form.reset();
        libraryContainer.style.visibility = "visible";
        formContainer.style.visibility = "hidden";
    })
    
    confirmEntry.addEventListener('click', (e) => {
        e.preventDefault();
        addBookToLibrary();
        libraryContainer.style.visibility = "visible";
        formContainer.style.visibility = "hidden";
    })
}

initialize();



