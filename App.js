const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  fs.readFile("username.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat exist";
    }
    res.send(
      `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input type="text" name="message" id="message">
                <input type="hidden" name="username" id="username">
                <br />
                <button type="submit">Send</button>
            </form>`
    );
  });
});

app.post("/", (req, res) => {
  fs.writeFile(
    "username.txt",
    `${req.body.username}: ${req.body.message}`,
    { flag: "a" },
    (err) => (err ? console.log(err) : null)
  );

  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.send(
    `<form action="/login" method="POST" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <input type="text" name="username" placeholder="username" id="username">
        <br />
        <button type="submit">Login</button>
    </form>`
  );
});

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.listen(3000);
