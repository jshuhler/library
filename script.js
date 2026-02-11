// CREATING BASE ELEMENTS
const myLibrary = [];

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
function addToLibrary () {
    var newBook = new Book();
    myLibrary.push(newBook);
}

addToLibrary();


// create unique book title

// TESTING
console.log(myLibrary);
const theHobbit = new Book("The Hobbit","JRR Tolkien","295","read");
// const annihilation = new Book("Annihilation","Jeff VanderMeer","208","unread");
console.log(theHobbit);
console.log(myLibrary);

