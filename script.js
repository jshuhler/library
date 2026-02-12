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
function addToLibrary(title, author, page, read) {
    const newBook = new Book(title,author,page,read)
    myLibrary.push(newBook);
}

addToLibrary("Annihilation","Jeff VanderMeer","208","unread");
addToLibrary("The Hobbit","JRR Tolkien","295","read");

// create unique book title

// TESTING
// const theHobbit = new Book("The Hobbit","JRR Tolkien","295","read");
// const annihilation = new Book("Annihilation","Jeff VanderMeer","208","unread");
// console.log(theHobbit);
console.log(myLibrary);

