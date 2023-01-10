const books = JSON.parse(localStorage.getItem('books')) || [];
const bookList = document.getElementById('books_list');
function Book(id, title, autor) {
  this.id = id;
  this.title = title;
  this.autor = autor;
}

const saveBooksLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const loadBooksLocalStorage = () => {
  const booksTemp = JSON.parse(localStorage.getItem('books'));
  booksTemp.forEach((element) => {
    const articleBook = `
                <article class="book_item">
                    <h4>${element.autor}</h4>
                    <h5>${element.title}</h5>
                    <button class="remove_book" id="book${element.id}" type="button" >Remove</button>
                </article>`;
    bookList.innerHTML += articleBook;
  });
};

const btnAddBook = document.getElementById('create_book');

let count = 0;
btnAddBook.addEventListener('click', (event) => {
  event.preventDefault();
  const titleBook = document.getElementById('input_title').value;
  const authorBook = document.getElementById('input_author').value;
  books.push(new Book(count, titleBook, authorBook));
  const articleBook = `
                <article class="book_item">
                    <h4>${books[count].autor}</h4>
                    <h5>${books[count].title}</h5>
                    <button class="remove_book" id="book${count}" type="button" >Remove</button>
                </article>`;
  bookList.innerHTML += articleBook;
  document.getElementById('form').reset();
  count += 1;
  saveBooksLocalStorage();
});

window.onload = () => {
  loadBooksLocalStorage();
};

function addArticleBook(element) {
    const articleBook =
                `<article class="book_item">
                    <h4>${element.autor}</h4>
                    <h5>${element.title}</h5>
                    <button class="remove_book" id="book${count}" type="button" >Remove</button>
                </article>`;
  bookList.innerHTML += articleBook;
}
