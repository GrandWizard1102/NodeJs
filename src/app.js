const express = require("express");

const session = require("express-session");

const app = express();

app.use(express.json());

app.use(session({ secret: "kanmani", resave: false, saveUninitialized: true }));
const PORT = 3000;

users = require("./data/users");

const jwt = require("jsonwebtoken");

router = require("./routes/books");

app.get("/", (req, res) => {
  res.send("Hii");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = users.filter(
      (u) => u.username === username && u.password === password,
    );
    if (user.length > 0) {
      const token = jwt.sign({ username }, "kanmani", { expiresIn: "1h" });
      req.session.authorization = { username, token };
      res.json("Logged in successfully");
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ error: "Username and password are required" });
  }
});

app.post("/Register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = users.filter((u) => u.username === username);
    if (user.length > 0) {
      res.send("User already exists");
    } else {
      users.push({ username, password });
      res.send("User registered successfully");
    }
  }
});

app.use("/books/auth/:any", (req, res, next) => {
  if (req.session.authorization) {
    let token = req.session.authorization.token;
    jwt.verify(token, "kanmani", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ error: "Invalid token" });
      }
    });
  } else {
    return res.status(403).json({ error: "No token provided" });
  }
});

app.use("/books", router);

app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});
