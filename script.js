// CREATING BASE ELEMENTS
const myLibrary = [];

// VARIABLES
let book;
const bookContainer = document.querySelectorAll(".book-container")


// constructor for creating a book object
function Book(title, author, page, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.id = crypto.randomUUID()
    // this.addToLibrary = function () {
    //     myLibrary.push(this);
    // }
    // this.addToLibrary();
}

// adding a book created above to the myLibrary array
function addToLibrary(title, author, page, read) {
    const newBook = new Book(title,author,page,read)
    myLibrary.push(newBook);
}

// adding books to DOM - looping through the myLibrary array and pulling each book out
// I think this will eventually be on an event listener, so not adding [assed [arameters right now
function updateLibraryPage(myLibrary) {
    // for (let i = 0; i < myLibrary.length; i++) {
    //     bookContainer.textContent = myLibrary[i];
    // }
    for (const book of myLibrary) {
        for (const key in book) {
            console.log(`${key}: ${book[key]}`);
        }
    }
}

// TESTING
// const theHobbit = new Book("The Hobbit","JRR Tolkien","295","read");
// const annihilation = new Book("Annihilation","Jeff VanderMeer","208","unread");
// console.log(theHobbit);
addToLibrary("Annihilation","Jeff VanderMeer","208","unread");
addToLibrary("The Hobbit","JRR Tolkien","295","read");
console.log(myLibrary);
updateLibraryPage(myLibrary);