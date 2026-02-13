// CREATING BASE ELEMENTS
const myLibrary = [];

// VARIABLES
let book;

// CREATING BOOK OBJECTS
const bookContainer = document.querySelector(".book-container");
const newBookButton = document.getElementById('add-book-btn');

// ADDING BOOKS MODAL
const closeModalButton = document.getElementById('modal-close');
const submitModalButton = document.getElementById('modal-submit');
const addBookModal = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const modalTitle = document.getElementById('title').value;
const modalAuthor = document.getElementById('author').value;
const modalPages = document.getElementById('pages').value;
const modalRead = document.getElementById('read').value;

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
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList = "book-card";
        bookCard.style.cssText = "padding-bottom: 20px";
        bookContainer.appendChild(bookCard);
        for (const key in book) {
            const bookValue = document.createElement("div");
            bookValue.classList = "book-value";
            // bookTitle.style.cssText placeholder
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
    console.log("submit book button press");
    e.preventDefault();    
});


// TESTING
// const theHobbit = new Book("The Hobbit","JRR Tolkien","295","read");
// const annihilation = new Book("Annihilation","Jeff VanderMeer","208","unread");
addToLibrary("House of Leaves","Mark Z. Danielewski","709","unread")
addToLibrary("Annihilation","Jeff VanderMeer","208","read");
addToLibrary("The Hobbit","JRR Tolkien","295","read");
console.log(myLibrary);
updateLibraryPage(myLibrary);
console.log(modalTitle, modalAuthor, modalPages, modalRead)