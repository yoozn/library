const addEntry = document.querySelector(".add-entry");
const formClose = document.querySelector(".close-button");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".form");
const libraryContainer = document.querySelector(".library-container");

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

