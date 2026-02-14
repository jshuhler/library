// CREATING BASE ELEMENTS
const myLibrary = [];

// VARIABLES
let book;

// CREATING BOOK OBJECTS
const bookContainer = document.querySelector(".book-container");
const newBookButton = document.getElementById('add-book-btn');

// ADDING BOOKS MODAL
const closeModalButton = document.getElementById('modal-close'); // to close the new book modal without adding a book
const submitModalButton = document.getElementById('modal-submit'); // to submit a new book to the library array
const addBookModal = document.querySelector(".add-book"); // the form itself, I don't think this is needed
const dialog = document.querySelector("dialog"); // to open the new book modal
let modalTitle;
let modalAuthor;
let modalPages;
let modalRead;

// CREATE A BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID()
}

// ADDING A BOOK TO LIBRARY ARRAY
function addToLibrary(title, author, pages, read) {
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook);
}

// UPDATE LIBRARY DISPLAY
function updateLibraryPage(myLibrary) {
    bookContainer.innerHTML = "";
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList = "book-card";
        bookCard.style.cssText = "padding-bottom: 20px";
        bookContainer.appendChild(bookCard);
        for (const key in book) {
            const bookValue = document.createElement("div");
            bookValue.classList = "book-value";
            bookCard.appendChild(bookValue);
            bookValue.textContent = `${key}: ${book[key]}`;
        }
    }
}

// OPEN NEW BOOK MODAL
newBookButton.addEventListener('click',() => {
    console.log("add new book button press");
    dialog.showModal();
});

// CLOSE NEW BOOK MODAL WITHOUT ADDING BOOK
closeModalButton.addEventListener('click',() => {
    console.log("close modal button press");
    dialog.close();
});

// CLOSE AND ADD NEW BOOK TO LIBRARY
submitModalButton.addEventListener('click', (e) => {
    modalTitle = document.getElementById('title').value; // new book title
    modalAuthor = document.getElementById('author').value; // new book author
    modalPages = document.getElementById('pages').value; //new book page count
    modalRead = document.getElementById('read').value; // new book read status
    addToLibrary(modalTitle, modalAuthor, modalPages, modalRead);
    updateLibraryPage(myLibrary);
    addBookModal.reset();
    dialog.close();
    e.preventDefault();
});

// TESTING
// const theHobbit = new Book("The Hobbit","JRR Tolkien","295","read");
// const annihilation = new Book("Annihilation","Jeff VanderMeer","208","unread");
// addToLibrary("House of Leaves","Mark Z. Danielewski","709","unread")
// addToLibrary("Annihilation","Jeff VanderMeer","208","read");
// addToLibrary("The Hobbit","JRR Tolkien","295","read");
// console.log(myLibrary);
// updateLibraryPage(myLibrary);
// console.log(`after click: ${modalTitle}`)