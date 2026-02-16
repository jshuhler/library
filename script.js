// CREATING BASE ELEMENTS
const myLibrary = [];

// VARIABLES
let book;
let bookCard;
let deleteButton;

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

// BOOK CARD ELEMENTS
// const deleteButton = document.createElement("button"); // create button

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

// UPDATE LIBRARY DISPLAY AND ADD BOOK CARD
function updateLibraryPage(myLibrary) {
    bookContainer.innerHTML = "";
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookContainer.appendChild(bookCard);
        for (const key in book) { 
            if (key === 'id') { // so the id doesn't appear on the bookCard
                continue;
            } else if (key === 'read') { // the empty `" "` in the DOM is coming from this code block somewhere.
                console.log(book[key]);
                const bookValue = document.createElement("div");
                bookValue.classList.add("book-value");
                const bookRead = document.createElement("input");
                bookRead.type = "checkbox";
                bookRead.classList.add("book-status");
                bookRead.checked = book.read;
                bookValue.appendChild(bookRead);
                bookCard.appendChild(bookValue);
            } else {
            const bookValue = document.createElement("div");
            bookValue.classList.add("book-value");
            bookValue.textContent = `${key}: ${book[key]}`;
            bookCard.appendChild(bookValue);
            }
        }
        createDeleteButton(bookCard);
    }
}

// CREATE DELETE BUTTON FOR EACH BOOK CARD
// created to take too much functionality out of updateLibraryPage
function createDeleteButton(bookCard) {
    const deleteContainer = document.createElement("div"); // create button container
    deleteContainer.classList.add("delete-container"); // add container class
    const deleteButton = document.createElement("button"); // create button

    deleteButton.classList.add("delete-button"); // add button class
    const deleteIcon = document.createElement("img"); // create img
    deleteIcon.setAttribute("src","./img/trashcan.png"); // img attribute
    deleteIcon.setAttribute("alt","An image of a trashcan"); // img attribute
    deleteButton.appendChild(deleteIcon); // nest img in button
    deleteContainer.appendChild(deleteButton); // nest button in container
    bookCard.appendChild(deleteContainer); // nest button in book-card
    return deleteButton;
}

// DELETE A SINGLE BOOK CARD CLICK LISTENER
// probably use splice()
// deleteButton.addEventListener('click', () => {
//     console.log("Trash can clicked");
// });

// OPEN NEW BOOK MODAL
newBookButton.addEventListener('click',() => {
    dialog.showModal();
});

// CLOSE NEW BOOK MODAL WITHOUT ADDING BOOK
closeModalButton.addEventListener('click',() => { //the close button is clearing the library page right now for some reason?
    dialog.close();
});

// CLOSE MODAL AND ADD NEW BOOK TO LIBRARY
submitModalButton.addEventListener('click', (e) => {
    modalTitle = document.getElementById('title').value; // new book title
    modalAuthor = document.getElementById('author').value; // new book author
    modalPages = document.getElementById('pages').value; //new book page count
    modalRead = document.getElementById('read').checked; // new book read status
    addToLibrary(modalTitle, modalAuthor, modalPages, modalRead);
    updateLibraryPage(myLibrary);
    addBookModal.reset();
    dialog.close();
    e.preventDefault();
});

// TESTING
// addToLibrary("House of Leaves","Mark Z. Danielewski","709","unread");
// // addToLibrary("Annihilation","Jeff VanderMeer","208","read");
// // addToLibrary("The Hobbit","JRR Tolkien","295","read");
// updateLibraryPage(myLibrary);