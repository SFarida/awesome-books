/* eslint-disable no-unused-vars */
let books;
const bookList = document.getElementById('books_list');

class Book {

  constructor(books) {
    this.books = books;
  }

  removeBook = (title) => {
    books = books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(books));
    loadBooksLocalStorage();
  };

  validateForm(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const bookObj = {
      title,
      author,
    };
    books.push(bookObj);
    document.getElementById('form').reset();
    localStorage.setItem('books', JSON.stringify(books));
    loadBooksLocalStorage();
  }
}

const bookObj = new Book(books)

loadBooksLocalStorage = () => {
  const container = bookList;
  container.replaceChildren();
  for (let i = 0; i < books.length; i += 1) {
    // Creating the paragraphs
    const title = document.createElement('p');
    const author = document.createElement('p');
    const hr = document.createElement('hr');
    const button = document.createElement('button');

    // Creating text nodes
    const titleText = document.createTextNode(books[i].title);
    const authorText = document.createTextNode(books[i].author);
    const buttonText = document.createTextNode('Remove');

    // Append text to nodes
    title.appendChild(titleText);
    author.appendChild(authorText);
    button.appendChild(buttonText);

    const bookTitle = books[i].title;

    button.addEventListener('click',
      () => {
        bookObj.removeBook(bookTitle);
      });

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(button);
    container.appendChild(hr);
  }
};

window.onload = () => {
  document.getElementById('form').addEventListener('submit', bookObj.validateForm);
  books = JSON.parse(localStorage.getItem('books')) || [];
  loadBooksLocalStorage();
};
