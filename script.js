const library = [];

function Book(title, author, pages, finished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = finished;
}

function addBookToLibrary(book) {
  library.push(book);
}

const bookOne = new Book('The Book of the New Sun', 'Gene Wolfe', 950, true);
const bookTwo = new Book('Human Action', 'Ludwig von Mises', 881, false);
const bookThree = new Book('Anatomy of the State', 'Murray Rothbard', 62, true);
const bookFour = new Book('Marooned in Realtime', 'Vernor Vinge', 270, true);

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
addBookToLibrary(bookFour);
