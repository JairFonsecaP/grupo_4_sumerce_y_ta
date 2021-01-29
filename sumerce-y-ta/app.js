const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/producto", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/product.html"));
});

app.get("/carrito", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/cart.html"));
});

app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/contact.html"));
});

app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("Server up at port " + port);
});
