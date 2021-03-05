const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const router = require("./routes/index");

const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use("/", router);

app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("Server up at port " + port);
});
