/* eslint-disable no-unused-vars */
/* eslint no-loop-func: "error" */
let books;
const bookList = document.getElementById('books_list');

function validateForm(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const bookObj = {
    title,
    author,
  };
  books.push(bookObj);

  localStorage.setItem('books', JSON.stringify(books));
  loadBooksLocalStorage();
  document.getElementById('form').reset();
}

const loadBooksLocalStorage = () => {
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
        removeBook(bookTitle);
      });

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(button);
    container.appendChild(hr);
  }
};

const removeBook = (title) => {
  books = books.filter((book) => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
  loadBooksLocalStorage();
};

window.onload = () => {
  document.getElementById('form').addEventListener('submit', validateForm);
  books = JSON.parse(localStorage.getItem('books')) || [];
  loadBooksLocalStorage();
};
