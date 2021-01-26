const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("Server up at port " + port);
});
