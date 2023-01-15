const library = [];

function Book(title, author, pages, finished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = finished;
}

// Can't use arrow function because of "this"
Book.prototype.addToLibrary = function () {
  library.splice(0, 0, this);
};

function handleDelete(e) {
  library.splice(e.target.dataset.index, 1);
}

function submitEdit(e) {
  const currentIndex = e.target.dataset.index;
  const popup = e.target.parentNode;
  const editTitle = popup.querySelector('#edit-title');
  library[currentIndex].title = editTitle.value;
  const editAuthor = popup.querySelector('#edit-author');
  library[currentIndex].author = editAuthor.value;
  const editPages = popup.querySelector('#edit-pages');
  library[currentIndex].pages = editPages.value;
  const editFinished = popup.querySelector('#edit-finished');
  if (editFinished.dataset.finished === 'true') {
    library[currentIndex].finished = true;
  } else {
    library[currentIndex].finished = false;
  }
}

function drawEditFinished(currentBook) {
  const editContainer = document.querySelector('#edit-finished-container');
  editContainer.innerHTML = '';
  const editFinished = document.createElement('button');
  editFinished.setAttribute('id', 'edit-finished');
  const popup = document.querySelector('.popup');

  if (currentBook.finished) {
    editFinished.textContent = 'FINISHED';
    editFinished.dataset.finished = true;
    editFinished.classList.add('button-finished');
    popup.classList.add('finished');
  } else {
    editFinished.textContent = 'NOT FINISHED';
    editFinished.dataset.finished = false;
    editFinished.classList.add('button-not-finished');
    popup.classList.remove('finished');
  }

  editContainer.appendChild(editFinished);

  editFinished.addEventListener('click', () => {
    editFinished.classList.toggle('button-finished');
    editFinished.classList.toggle('button-not-finished');
    popup.classList.toggle('finished');
    if (editFinished.dataset.finished === 'true') {
      editFinished.textContent = 'NOT FINISHED';
      editFinished.dataset.finished = false;
    } else {
      editFinished.textContent = 'FINISHED';
      editFinished.dataset.finished = true;
    }
  });
}

function handleCancel() {
  const grayout = document.querySelector('.grayout');
  grayout.setAttribute('style', 'display:none;');
}

function handleEdit(e) {
  // Show the popup & fill the inputs with current book info
  const grayout = document.querySelector('.grayout');
  grayout.setAttribute('style', 'display:flex;');

  const editTitle = document.querySelector('#edit-title');
  const editAuthor = document.querySelector('#edit-author');
  const editPages = document.querySelector('#edit-pages');

  const currentBook = library[e.target.dataset.index];

  drawEditFinished(currentBook);

  editTitle.value = currentBook.title;
  editAuthor.value = currentBook.author;
  editPages.value = currentBook.pages;

  const submit = document.querySelector('#edit-submit');
  // Keep track of index for submiting edits
  submit.dataset.index = e.target.dataset.index;
  submit.addEventListener('click', submitEdit);

  // Cancel editing
  const cancel = document.querySelector('#edit-cancel');
  cancel.addEventListener('click', handleCancel);

  // XXX Relying on hoisting here...
  submit.addEventListener('click', drawLibrary);
  cancel.addEventListener('click', drawLibrary);
}

function drawLibrary() {
  // Clear the library display & draw every book
  const librarySection = document.querySelector('.library');
  librarySection.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    // Keep track of index for editing / deleting books
    newBook.dataset.index = i;

    const newTitle = document.createElement('p');
    newTitle.classList.add('book-title');
    newTitle.textContent = library[i].title;
    newBook.appendChild(newTitle);

    const newAuthor = document.createElement('p');
    newAuthor.textContent = `by ${library[i].author}`;
    newAuthor.classList.add('book-author');
    newBook.appendChild(newAuthor);

    const newPages = document.createElement('p');
    newPages.textContent = `${library[i].pages} pages`;
    const newFinished = document.createElement('span');
    if (library[i].finished) {
      newFinished.textContent = 'Finished';
      newBook.classList.add('finished');
    } else {
      newFinished.textContent = 'Not finished';
      newBook.classList.remove('finished');
    }
    newBook.appendChild(newPages);
    newBook.appendChild(newFinished);

    const newOptions = document.createElement('div');
    newOptions.classList.add('options');
    const editButton = document.createElement('button');
    editButton.classList.add('book-edit');
    const deleteButton = document.createElement('button');
    editButton.dataset.index = i;
    editButton.addEventListener('click', (e) => {
      handleEdit(e);
    });
    editButton.setAttribute('type', 'button');
    // Keep track for deleting book
    deleteButton.dataset.index = i;
    deleteButton.classList.add('book-delete');
    deleteButton.addEventListener('click', (e) => {
      handleDelete(e);
      drawLibrary();
    });
    deleteButton.setAttribute('type', 'button');

    newOptions.appendChild(editButton);
    newOptions.appendChild(deleteButton);
    newBook.appendChild(newOptions);

    librarySection.appendChild(newBook);
  }
}

function createNewBook() {
  const newTitle = document.querySelector('#title');
  const newAuthor = document.querySelector('#author');
  const newPages = document.querySelector('#pages');
  const newFinished = document.querySelector('#finished');
  const submit = document.querySelector('#submit');
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    const newBook = new Book(
      newTitle.value,
      newAuthor.value,
      newPages.value,
      newFinished.checked,
    );
    newBook.addToLibrary();
    drawLibrary();
  });
}

function clearPopup() {
  const grayout = document.querySelector('.grayout');
  const submit = document.querySelector('#edit-submit');
  submit.addEventListener('click', () => {
    grayout.setAttribute('style', 'display:none;');
  });
}

// Some default books to get the ball rollin'
const bookOne = new Book('Book of the New Sun', 'Gene Wolfe', 950, true);
const bookTwo = new Book('Human Action', 'Ludwig von Mises', 881, false);
const bookThree = new Book('Marooned in Realtime', 'Vernor Vinge', 270, true);

bookOne.addToLibrary();
bookTwo.addToLibrary();
bookThree.addToLibrary();

drawLibrary();
clearPopup();
createNewBook();
