# library
Working on the library project from [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-library)'s Javascript course. 

[Live preview](https://jshuhler.github.io/library/)

## working notes
### to do
- [X] come up with a way to create a unique book title given an input name and a unique ID (`crypto.randomUUID()`)
- [X] push book objects into the myLibrary array
    - [this helped](https://stackoverflow.com/questions/42866809/push-to-array-from-constructor-in-plain-javascript)
- [X] split the above add to library array piece into a separate function so it can be called individually.
- [X] figure out adding books to the HTML
- [X] change read/unread from picklist to single checkbox
- [X] how can I add an icon to the cards when they're being created via javascript?
- [X] change the checkbox to status: read/unread on bookCard
- [X] change styling/capitalization of headers for labels
- [ ] add functionality for changing read/unread from card, pushing update to library
- [ ] style the container the bookCards are held in, grid v flex?
- [ ] dark mode
- [ ] remove all the console.log from script

### books
- title
- author
- page count
- read
- id

### removing book based on the id
- it'll have to iterate through the myLibrary array, check each id value for the one that it's looking for, and when it finds it, delete that entire book-card element. Which is going to contain the new delete button that I'm building anyway, so that won't be an issue. I'll be able to use some array method for that.

### dark mode
```css
--card-color: #2d2d2d;
--body-color: #1a1a1a;
/* Text colors */
color: #e5e5e5;  /* for general text on dark backgrounds */

/* Links */
a {
    color: #e5e5e5;
}

a:visited {
    color: #e5e5e5;
}

/* Input border */
border-bottom: 1px solid #4a4a4a;  /* replaces your #cccccc */

/* Input focus */
border-bottom: 1px solid #4d9fff;  /* replaces your #0075fc, slightly lighter for contrast */

/* Box shadow */
--box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);  /* increased opacity from 0.1 to 0.4 */
```