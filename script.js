let addEntry = document.querySelector(".add-entry");
const formClose = document.querySelector(".close-button");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".form");
const formAuthor = document.querySelector("#author");
const formTitle = document.querySelector("#title");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const confirmEntry = document.querySelector(".submit");
const libraryContainer = document.querySelector(".library-container");
const removeEntryButton = document.querySelector(".remove-entry");
let libraryGrid = document.querySelector(".library-grid");

let myLibrary = [];
let formVisible = false;

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
    addEntry = document.createElement('button');
    addEntry.classList.add('add-entry');
    addEntry.textContent = "+";
    libraryGrid.appendChild(addEntry);
    addEntry.addEventListener('click', ()=> {
        toggleFormVisible();
    });
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
    remove.classList.add('remove-entry');
    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    readLabel.textContent = "Read";
    readCheck.checked = myLibrary[i].read;
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
        book.style.pointerEvents = "none";
        book.classList.add("shrink");
        book.classList.add("invisible");
        book.addEventListener('transitionend', updateLibrary);
    });

    form.reset();
}

function initialize() {
    libraryGrid = document.createElement('div');
    libraryGrid.classList.add('library-grid');
    libraryContainer.appendChild(libraryGrid);
    myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", "304 pages", true));
    updateLibrary();
    
    formClose.addEventListener('click', (e) => {
        form.reset();
        toggleFormVisible();
    });
    
    confirmEntry.addEventListener('click', (e) => {
        e.preventDefault();
        addBookToLibrary();
        toggleFormVisible();
    });
}

function toggleFormVisible() {
    if (formVisible) {
        formVisible = !formVisible;
        formContainer.classList.add('invisible');
        form.classList.add('shrink');
        formContainer.addEventListener('transitionend', () => {
            libraryContainer.style.visibility = "visible";
            formContainer.style.visibility = "hidden";
            libraryContainer.classList.remove('invisible');
            libraryContainer.classList.remove('shrink');
        }, {once: true});
    }
    else {
        formVisible = !formVisible;
        libraryContainer.classList.add('invisible');
        libraryContainer.classList.add('shrink');
        libraryContainer.addEventListener('transitionend', () => {
            libraryContainer.style.visibility = "hidden";
            formContainer.style.visibility = "visible";
            formContainer.classList.remove('invisible');
            form.classList.remove('shrink');
        }, {once: true});
    }
}
initialize();



