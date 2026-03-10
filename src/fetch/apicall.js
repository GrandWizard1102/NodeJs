const axios = require("axios");

// 1. Retrieve all books - Async/Await
async function getAll() {
  const res = await axios.get("http://localhost:3000/books/");
  console.log("All Books (Async/Await):", res.data);
}

// 2. Search by ISBN - Promises
function getISBN(isbn) {
  axios
    .get(`http://localhost:3000/books/isbn/${isbn}`)
    .then((res) => console.log("By ISBN (Promise):", res.data))
    .catch((err) => console.log(err.message));
}

// 3. Search by Author - Async/Await
async function getAuthor(author) {
  const res = await axios.get(`http://localhost:3000/books/author/${author}`);
  console.log("By Author:", res.data);
}

// 4. Search by Title - Promises
function getTitle(title) {
  axios
    .get(`http://localhost:3000/books/title/${title}`)
    .then((res) => console.log("By Title:", res.data));
}

// Run all
getAll();
getISBN("1");
getAuthor("Jane Austen");
getTitle("Fairy tales");
