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
const libraryGrid = document.querySelector(".library-grid");

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

}

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
    const book = document.createElement('div');
    book.classList.add("book");
    libraryGrid.appendChild(book);
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    title.classList.add('b-title');
    author.classList.add('b-author');
    pages.classList.add('b-pages');
    read.classList.add('b-read');
    title.textContent = formTitle.value;
    author.textContent = formAuthor.value;
    pages.textContent = formPages.value;
    read.textContent = "on" ? "read" : "not read";
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    libraryContainer.style.visibility = "visible";
    formContainer.style.visibility = "hidden";
})


