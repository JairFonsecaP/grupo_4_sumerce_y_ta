const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes");

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", router);

app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("Server up at port " + port);
});
