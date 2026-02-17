// CREATING BASE ELEMENTS
const myLibrary = [];

// VARIABLES
let book;
let bookCard;
let bookStatus;
let cardLabel;

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

// OBJECT FOR CARD DISPLAY 
const labels = {
    title: "Title: ",
    author: "Author: ",
    pages: "Page Count: ",
};

// CREATE A BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    };
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
};

// ADDING A BOOK TO LIBRARY ARRAY
function addToLibrary(title, author, pages, read) {
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook);
}

// CREATE BOOK CARD AND ADD IT TO LIBRARY PAGE WITH EACH MODAL SUBMIT
function updateLibraryPage(myLibrary    ) {
    bookContainer.innerHTML = "";
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookContainer.appendChild(bookCard);
        for (const key in book) { 
            if (key === 'id') { // so the id doesn't appear on the bookCard
                continue;
            } else if (key === 'read') { // the empty `" "` in the DOM is coming from this code block somewhere.
                const bookValue = document.createElement("div");
                bookValue.classList.add("book-value");

                if (book.read === true) {
                    bookValue.textContent = `Status: Read`;
                } else if (book.read === false) {
                    bookValue.textContent = `Status: Unread`;
                };
                bookCard.appendChild(bookValue);
            } else {
            const bookValue = document.createElement("div");
            bookValue.classList.add("book-value");
            cardLabel = `${key}`;
            bookValue.innerHTML = `<strong>${labels[cardLabel]}</strong>${book[key]}`;
            bookCard.appendChild(bookValue);
            }
        }
        createReadButton(bookCard);
        createDeleteButton(bookCard, book);
    }
}

// CREATE READ BUTTON FOR EACH BOOK CARD
function createReadButton(bookCard) {
    const readContainer = document.createElement("div"); // create button container
    readContainer.classList.add("read-unread-container");
    const readButton = document.createElement("button"); // create button
    readButton.classList.add("read-unread-button");
    readButton.textContent = "THIS IS A BUTTON FUCK YEAH";
    readContainer.appendChild(readButton);
    bookCard.appendChild(readContainer);
    return readButton;
}

// CREATE DELETE BUTTON FOR EACH BOOK CARD
// created to take too much functionality out of updateLibraryPage
function createDeleteButton(bookCard, book) {
    const deleteContainer = document.createElement("div"); // create button container
    deleteContainer.classList.add("delete-container"); // add container class
    const deleteButton = document.createElement("button"); // create button
    deleteButton.classList.add("delete-button"); // add button class
    deleteButton.setAttribute("data-id",book.id);
    
    deleteButton.addEventListener('click', () => { // adding event listener for the button immediately after it's created before nodes added to it
        console.log("Trash can click");
        console.log(myLibrary);
        const bookToRemove = myLibrary.find((currentBook) => currentBook.id === book.id);
        console.log(bookToRemove);
        const index = myLibrary.indexOf(bookToRemove);
        console.log(index);
        if (index > -1) { // only splice array when item is found
            myLibrary.splice(index, 1); 
        };
        updateLibraryPage(myLibrary);
    });

    const deleteIcon = document.createElement("img"); // create img
    deleteIcon.setAttribute("src","./img/trashcan.png"); // img attribute
    deleteIcon.setAttribute("alt","An image of a trashcan"); // img attribute
    deleteButton.appendChild(deleteIcon); // nest img in button
    deleteContainer.appendChild(deleteButton); // nest button in container
    bookCard.appendChild(deleteContainer); // nest button in book-card
    return deleteButton;
}

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
addToLibrary("House of Leaves","Mark Z. Danielewski","709",false);
addToLibrary("Annihilation","Jeff VanderMeer","208",true);
addToLibrary("The Hobbit","JRR Tolkien","295",true);
updateLibraryPage(myLibrary);