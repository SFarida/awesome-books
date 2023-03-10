/* global loadBooksLocalStorage:writable */

let books;
const bookList = document.getElementById('books_list');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  removeBook = (title) => {
    books = books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(books));
    loadBooksLocalStorage();
  };

  validateForm(e) {
    e.preventDefault();
    const bookObj = {
      title: this.title.value,
      author: this.author.value,
    };
    books.push(bookObj);
    document.getElementById('form').reset();
    localStorage.setItem('books', JSON.stringify(books));
    loadBooksLocalStorage();
  }
}

const addDate = () => {
  const p = document.getElementById('date');
  const d = new Date();
  const pText = document.createTextNode(`${months[d.getMonth()]} ${d.getDay()}th ${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} pm`);
  p.appendChild(pText);
};

const bookTitle = document.getElementById('title').value;
const bookAuthor = document.getElementById('author').value;
const bookObj = new Book(bookTitle, bookAuthor);

loadBooksLocalStorage = () => {
  const container = bookList;
  container.replaceChildren();
  for (let i = 0; i < books.length; i += 1) {
    // Creating the paragraphs
    const tableRow = document.createElement('tr');
    const title = document.createElement('td');
    const buttonTd = document.createElement('td');
    const button = document.createElement('button');

    // Creating text nodes
    const rowText = document.createTextNode(`"${books[i].title}" by ${books[i].author}`);
    const buttonText = document.createTextNode('Remove');

    // Append text to nodes
    title.appendChild(rowText);
    button.appendChild(buttonText);
    buttonTd.appendChild(button);
    tableRow.appendChild(title);
    tableRow.appendChild(buttonTd);

    buttonTd.setAttribute('class', 'button-row');

    const bookTitle = books[i].title;

    button.addEventListener('click',
      () => {
        bookObj.removeBook(bookTitle);
      });

    container.appendChild(tableRow);
  }
};

window.onload = () => {
  document.getElementById('form').addEventListener('submit', bookObj.validateForm);
  books = JSON.parse(localStorage.getItem('books')) || [];
  loadBooksLocalStorage();
  addDate();
};

// LOAD PAGEs
function loadContent(startPage = 'list_link', destinationPage) {
  document.querySelector(`.${startPage}`).classList.add('hidden');
  document.querySelector(`.${destinationPage}`).classList.remove('hidden');
}

let previousId;
function setId(id) {
  previousId = id;
}

// Add onblur event Listener to each nav botton
document.getElementById('list_link').addEventListener('blur', (e) => {
  setId(e.target.id);
});
document.getElementById('list_add_new').addEventListener('blur', (e) => {
  setId(e.target.id);
});
document.getElementById('list_about').addEventListener('blur', (e) => {
  setId(e.target.id);
});

//
document.getElementById('nav_list').addEventListener('click', (e) => {
  loadContent(previousId, e.target.id);
});
