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

Book.prototype.toggleRead = function () {
    // console.log(`${this.title} toggle press`);
    // console.log('myLibrary read value:', this.read);
    // console.log(myLibrary);
    // console.log(`before press: ${this.read}`)
    if (this.read === true) {
        this.read = false; 
    } else if (this.read === false) {
        this.read = true;
    }
    // console.log(`after press: ${this.read}`)
    updateLibraryPage(myLibrary);
    // console.log(myLibrary)
}

// ADDING A BOOK TO LIBRARY ARRAY
function addToLibrary(title, author, pages, read) {
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook);
}

// CREATE BOOK CARD AND ADD IT TO LIBRARY PAGE WITH EACH MODAL SUBMIT
function updateLibraryPage(myLibrary) {
    // let buttonContainer;
    bookContainer.innerHTML = "";
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookContainer.appendChild(bookCard);
        for (const key in book) { 
            if (Object.hasOwn(book,key) === true) { // hiding the prototype function from the bookCard
                if (key === 'id') { // so the id doesn't appear on the bookCard
                    continue;
                } else if (key === 'read') { // the empty `" "` in the DOM is coming from this code block somewhere.
                    const bookValue = document.createElement("div");
                    bookValue.classList.add("book-value");
                    if (book.read === true) {
                        bookValue.innerHTML = `<strong>Status:</strong> Read`;
                    } else if (book.read === false) {
                        bookValue.innerHTML = `<strong>Status:</strong> Unread`;
                    };
                    bookCard.appendChild(bookValue);
                } else {
                const bookValue = document.createElement("div");
                bookValue.classList.add("book-value");
                cardLabel = `${key}`;
                bookValue.innerHTML = `<strong>${labels[cardLabel]}</strong>${book[key]}`;
                bookCard.appendChild(bookValue);
                }
            } else {
                continue;
            }  
        }        
        const read = createReadButton(bookCard, book);
        createDeleteButton(bookCard, book, read);
    };
};

// CREATE READ BUTTON FOR EACH BOOK CARD
function createReadButton(bookCard, book) {
    const buttonContainer = document.createElement("div"); // create button container
    buttonContainer.classList.add("button-container"); // add container class
    const readButton = document.createElement("button"); // create button
    readButton.classList.add("read-unread-button"); // "read-unread-button" class
    readButton.textContent = "Toggle Read Status"; // text in button
    readButton.setAttribute("data-id",book.id);

    readButton.addEventListener('click', () => {
        book.toggleRead();
    });

    buttonContainer.appendChild(readButton);
    bookCard.appendChild(buttonContainer);
    return buttonContainer;
}

// CREATE DELETE BUTTON FOR EACH BOOK CARD
// created to take too much functionality out of updateLibraryPage
function createDeleteButton(bookCard, book, buttonContainer) {
    // const buttonContainer = document.createElement("div"); // create button container
    // buttonContainer.classList.add("button-container"); // add container class
    const deleteButton = document.createElement("button"); // create button
    deleteButton.classList.add("delete-button"); // add button class
    deleteButton.setAttribute("data-id",book.id); //data attribute for deletion logic
    
    deleteButton.addEventListener('click', () => { // adding event listener for the button immediately after it's created before nodes added to it
        // console.log("Trash can click");
        // console.log(myLibrary);
        const bookToRemove = myLibrary.find((currentBook) => currentBook.id === book.id);
        // console.log(bookToRemove);
        const index = myLibrary.indexOf(bookToRemove);
        // console.log(index);
        if (index > -1) { // only splice array when item is found
            myLibrary.splice(index, 1); 
        };
        updateLibraryPage(myLibrary);
    });

    const deleteIcon = document.createElement("img"); // create img
    deleteIcon.setAttribute("src","./img/trashcan.png"); // img attribute
    deleteIcon.setAttribute("alt","An image of a trashcan"); // img attribute
    deleteButton.appendChild(deleteIcon); // nest img in button
    buttonContainer.appendChild(deleteButton); // nest button in container
};

// OPEN NEW BOOK MODAL
newBookButton.addEventListener('click',() => {
    dialog.showModal();
});

// CLOSE NEW BOOK MODAL WITHOUT ADDING BOOK
closeModalButton.addEventListener('click',(e) => { //the close button is clearing the library page right now for some reason?
    dialog.close();
    e.preventDefault();
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

// DARK MODE
function setTheme() {
    const body = document.body;
    const newTheme = body.className === "dark-mode" ? "" : "dark-mode";
    body.className = newTheme;
}

document.querySelector(".light-dark-mode").addEventListener('click', setTheme);


// TESTING
addToLibrary("House of Leaves","Mark Z. Danielewski","709",false);
addToLibrary("Annihilation","Jeff VanderMeer","208",true);
addToLibrary("The Hobbit","JRR Tolkien","295",true);
updateLibraryPage(myLibrary);