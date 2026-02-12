// CREATING BASE ELEMENTS
const myLibrary = [];

// VARIABLES
let book;
const bookContainer = document.querySelector(".book-container");
const newBookBtn = document.getElementById('add-book-btn');
const dialog = document.querySelector(".dialog");

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

// NEW BOOK BUTTON
newBookBtn.addEventListener('click',() => {
    console.log("add new book button press")
    dialog.showModal();
});

// TESTING
// const theHobbit = new Book("The Hobbit","JRR Tolkien","295","read");
// const annihilation = new Book("Annihilation","Jeff VanderMeer","208","unread");
addToLibrary("House of Leaves","Mark Z. Danielewski","709","unread")
addToLibrary("Annihilation","Jeff VanderMeer","208","read");
addToLibrary("The Hobbit","JRR Tolkien","295","read");
console.log(myLibrary);
updateLibraryPage(myLibrary);