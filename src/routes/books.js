const express = require("express");
const router = express.Router();

router.use(express.json());

let books = {
  1: { author: "Chinua Achebe", title: "Things Fall Apart", reviews: {} },
  2: { author: "Hans Christian Andersen", title: "Fairy tales", reviews: {} },
  3: { author: "Dante Alighieri", title: "The Divine Comedy", reviews: {} },
  4: { author: "Jane Austen", title: "Pride and Prejudice", reviews: {} },
  5: { author: "Honoré de Balzac", title: "Le Père Goriot", reviews: {} },
  6: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
  },
};

router.get("/", (req, res) => {
  res.send(JSON.stringify(books, null, 4));
});

router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const book = Object.values(books).filter(
    (b) => b.title.toLowerCase() === title,
  );
  if (book.length > 0) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(404).send("No book found with that title.");
  }
});

router.get("/author/:author", (req, res) => {
  const author = req.params.author;
  const book = Object.values(books).filter(
    (b) => b.author.toLowerCase() === author.toLowerCase(),
  );
  if (book.length > 0) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(404).send("No book found by that author.");
  }
});

router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  console.log("Searching for ISBN:", isbn);
  const book = books[isbn];
  if (book) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(404).json({ message: "ISBN not found" });
  }
});

router.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.username;
  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    res.send(
      `The review for the book with ISBN ${isbn} has been added/updated.`,
    );
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    res.send(`Review for ISBN ${isbn} by user ${username} deleted.`);
  } else {
    res.status(404).json({ message: "Review not found or unauthorized" });
  }
});

module.exports = router;
